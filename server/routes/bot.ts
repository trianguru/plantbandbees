import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import crypto from "crypto";
import multer from "multer";
import { put, list } from "@vercel/blob";

const BODY_LIMIT = "25mb";
const MAX_BYTES = 25 * 1024 * 1024;
const DEFAULT_DECOY_URL = "https://www.plantbandbees.com/";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES },
});

function decoyUrl(): string {
  const raw = (process.env.BOT_DECOY_URL || DEFAULT_DECOY_URL).trim();
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return DEFAULT_DECOY_URL;
    return u.toString();
  } catch {
    return DEFAULT_DECOY_URL;
  }
}

/** Stealth: no 401 JSON — send browsers/bots to a lookalike marketing URL. */
function rejectUnauthorized(res: Response): void {
  res.redirect(302, decoyUrl());
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    if (bufA.length > 0) {
      crypto.timingSafeEqual(bufA, bufA);
    }
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

function extractToken(req: Request): string | undefined {
  const auth = req.headers.authorization;
  if (typeof auth === "string" && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  const apiKey = req.headers["x-api-key"];
  if (typeof apiKey === "string") return apiKey.trim();
  if (Array.isArray(apiKey) && apiKey[0]) return String(apiKey[0]).trim();
  return undefined;
}

function requireToken(
  envName: "INGEST_TOKEN" | "FILES_TOKEN",
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    const expected = process.env[envName];
    if (!expected) {
      return rejectUnauthorized(res);
    }
    const provided = extractToken(req);
    if (!provided || !timingSafeEqualStr(provided, expected)) {
      return rejectUnauthorized(res);
    }
    next();
  };
}

const requireIngestAuth = requireToken("INGEST_TOKEN");
const requireFilesAuth = requireToken("FILES_TOKEN");

function sanitizeName(name: string): string | null {
  const base = name.split(/[/\\]/).pop()?.trim() ?? "";
  if (!base || base === "." || base === "..") return null;
  if (base.includes("..")) return null;
  if (!/^[a-zA-Z0-9._-]+$/.test(base)) return null;
  return base;
}

function clientIp(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff[0]) return String(xff[0]).split(",")[0].trim();
  return req.ip ?? "";
}

function hostIsIngest(req: Request): boolean {
  const host = String(req.headers.host ?? "").toLowerCase();
  return host.includes("ingest.");
}

/** Private Blob store — access must be "private". */
async function putJsonBlob(pathname: string, data: unknown) {
  return put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function putBinaryBlob(
  pathname: string,
  body: Buffer | string,
  contentType?: string,
) {
  return put(pathname, body, {
    access: "private",
    addRandomSuffix: false,
    ...(contentType ? { contentType } : {}),
  });
}

async function fetchPrivateBlob(url: string): Promise<Response> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

function textParser() {
  return express.text({
    type: ["text/*", "application/octet-stream"],
    limit: BODY_LIMIT,
  });
}

function rawParser() {
  return express.raw({ type: "*/*", limit: BODY_LIMIT });
}

/**
 * Token-gated ingest + files bot endpoints backed by Vercel Blob.
 * Mounted early (no session auth). Uses INGEST_TOKEN / FILES_TOKEN.
 * Missing/invalid token → 302 to BOT_DECOY_URL (default www.plantbandbees.com).
 */
export function registerBotRoutes(app: Express): void {
  app.get("/health", (req, res, next) => {
    if (!hostIsIngest(req)) return next();
    return res.json({ ok: true });
  });

  app.get("/ingest/health", (_req, res) => {
    res.json({ ok: true });
  });

  const ingestUpload = upload.fields([
    { name: "file", maxCount: 1 },
    { name: "data", maxCount: 1 },
  ]);

  app.post(
    "/ingest",
    requireIngestAuth,
    (req, res, next) => {
      const ct = String(req.headers["content-type"] ?? "").toLowerCase();
      if (ct.includes("multipart/form-data")) {
        return ingestUpload(req, res, (err) => {
          if (err) {
            console.error("ingest multipart error:", err);
            return res.status(400).json({
              ok: false,
              error: err.message || "Multipart parse failed",
            });
          }
          next();
        });
      }
      if (ct.startsWith("text/") || ct.includes("application/octet-stream")) {
        return textParser()(req, res, next);
      }
      next();
    },
    async (req: Request, res: Response) => {
      try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return res.status(503).json({
            ok: false,
            error: "BLOB_READ_WRITE_TOKEN is not configured",
          });
        }

        const id = crypto.randomUUID();
        const received_at = new Date().toISOString();
        const contentType = String(req.headers["content-type"] ?? "");
        const source =
          typeof req.query.source === "string" ? req.query.source : undefined;
        const label =
          typeof req.query.label === "string" ? req.query.label : undefined;

        let payload: unknown = null;
        let fileUrl: string | undefined;
        let fileName: string | undefined;

        const files = (req as any).files as
          | {
              file?: Array<{ originalname: string; buffer: Buffer; mimetype: string }>;
              data?: Array<{ originalname: string; buffer: Buffer; mimetype: string }>;
            }
          | undefined;

        if (files?.file?.[0] || files?.data?.[0]) {
          const file = files.file?.[0] ?? files.data?.[0];
          if (file) {
            const safe = sanitizeName(file.originalname) ?? `upload-${id}`;
            const blob = await putBinaryBlob(
              `ingest/${id}/file-${safe}`,
              file.buffer,
              file.mimetype || "application/octet-stream",
            );
            fileUrl = blob.url;
            fileName = safe;
            payload =
              req.body && Object.keys(req.body).length > 0 ? req.body : null;
          }
        } else if (typeof req.body === "string") {
          const trimmed = req.body.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              payload = JSON.parse(trimmed);
            } catch {
              payload = req.body;
            }
          } else {
            payload = req.body;
          }
        } else if (Buffer.isBuffer(req.body)) {
          payload = {
            encoding: "base64",
            data: req.body.toString("base64"),
          };
        } else if (req.body !== undefined && req.body !== null) {
          payload = req.body;
        }

        const wrapper = {
          id,
          received_at,
          source: source ?? null,
          label: label ?? null,
          ip: clientIp(req),
          content_type: contentType || null,
          user_agent: req.headers["user-agent"] ?? null,
          fileUrl: fileUrl ?? null,
          fileName: fileName ?? null,
          payload,
        };

        await putJsonBlob(`ingest/${id}.json`, wrapper);
        return res.status(200).json({ ok: true, id, received_at });
      } catch (error) {
        console.error("ingest error:", error);
        return res.status(500).json({
          ok: false,
          error: error instanceof Error ? error.message : "Ingest failed",
        });
      }
    },
  );

  const listIngest = async (req: Request, res: Response) => {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(503).json({
          ok: false,
          error: "BLOB_READ_WRITE_TOKEN is not configured",
        });
      }

      const { blobs } = await list({ prefix: "ingest/", limit: 100 });
      const items = blobs
        .filter((b) => b.pathname.endsWith(".json"))
        .map((b) => ({
          pathname: b.pathname,
          url: b.url,
          size: b.size,
          uploadedAt: b.uploadedAt,
          contentType: b.contentType,
        }));

      const accept = String(req.headers.accept ?? "");
      if (accept.includes("text/html")) {
        const rows = items
          .map(
            (i) =>
              `<tr><td>${i.pathname}</td><td>${i.size}</td><td>${i.uploadedAt}</td></tr>`,
          )
          .join("\n");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(
          `<!doctype html><html><head><title>Ingest dumps</title></head><body>
<h1>Recent ingest dumps</h1>
<p>Private Blob store — use <code>GET /ingest/dumps</code> with your token (Accept: application/json) to fetch metadata.</p>
<table border="1" cellpadding="6"><thead><tr><th>Path</th><th>Size</th><th>Uploaded</th></tr></thead>
<tbody>${rows || "<tr><td colspan=3>No dumps yet</td></tr>"}</tbody></table>
</body></html>`,
        );
      }

      return res.json({ ok: true, items });
    } catch (error) {
      console.error("ingest list error:", error);
      return res.status(500).json({
        ok: false,
        error: error instanceof Error ? error.message : "List failed",
      });
    }
  };

  app.get("/ingest", requireIngestAuth, listIngest);
  app.get("/ingest/dumps", requireIngestAuth, listIngest);

  const uploadFileHandler = async (req: Request, res: Response) => {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(503).json({
          ok: false,
          error: "BLOB_READ_WRITE_TOKEN is not configured",
        });
      }

      const name = sanitizeName(String(req.params.name ?? ""));
      if (!name) {
        return res.status(400).json({
          ok: false,
          error:
            "Invalid name; use alphanumeric, dot, underscore, or hyphen only",
        });
      }

      let body: Buffer;
      if (Buffer.isBuffer(req.body)) {
        body = req.body;
      } else if (typeof req.body === "string") {
        body = Buffer.from(req.body);
      } else if (req.body && typeof req.body === "object") {
        body = Buffer.from(JSON.stringify(req.body));
      } else {
        return res.status(400).json({ ok: false, error: "Empty body" });
      }

      if (body.length > MAX_BYTES) {
        return res.status(413).json({ ok: false, error: "Body too large" });
      }

      const contentType =
        String(req.headers["content-type"] ?? "") || "application/octet-stream";
      const blob = await putBinaryBlob(`files/${name}`, body, contentType);
      return res.status(200).json({ ok: true, name, url: blob.url });
    } catch (error) {
      console.error("files upload error:", error);
      return res.status(500).json({
        ok: false,
        error: error instanceof Error ? error.message : "Upload failed",
      });
    }
  };

  app.put("/files/:name", requireFilesAuth, rawParser(), uploadFileHandler);
  app.post("/files/:name", requireFilesAuth, rawParser(), uploadFileHandler);

  app.get(
    "/files/:name",
    requireFilesAuth,
    async (req: Request, res: Response) => {
      try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return res.status(503).json({
            ok: false,
            error: "BLOB_READ_WRITE_TOKEN is not configured",
          });
        }

        const name = sanitizeName(String(req.params.name ?? ""));
        if (!name) {
          return res.status(400).json({ ok: false, error: "Invalid name" });
        }

        const { blobs } = await list({ prefix: `files/${name}`, limit: 10 });
        const match =
          blobs.find((b) => b.pathname === `files/${name}`) ?? blobs[0];
        if (!match) {
          return res.status(404).json({ ok: false, error: "Not found" });
        }

        const upstream = await fetchPrivateBlob(match.url);
        if (!upstream.ok) {
          return res.status(502).json({
            ok: false,
            error: `Blob fetch failed (${upstream.status})`,
          });
        }

        const buf = Buffer.from(await upstream.arrayBuffer());
        const ct =
          match.contentType ||
          upstream.headers.get("content-type") ||
          "application/octet-stream";
        res.setHeader("Content-Type", ct);
        res.setHeader("Content-Length", String(buf.length));
        res.setHeader("Content-Disposition", `inline; filename="${name}"`);
        return res.status(200).send(buf);
      } catch (error) {
        console.error("files download error:", error);
        return res.status(500).json({
          ok: false,
          error: error instanceof Error ? error.message : "Download failed",
        });
      }
    },
  );

  app.get("/files", requireFilesAuth, async (_req, res) => {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(503).json({
          ok: false,
          error: "BLOB_READ_WRITE_TOKEN is not configured",
        });
      }

      const { blobs } = await list({ prefix: "files/", limit: 200 });
      const items = blobs.map((b) => ({
        pathname: b.pathname,
        name: b.pathname.replace(/^files\//, ""),
        url: b.url,
        size: b.size,
        uploadedAt: b.uploadedAt,
        contentType: b.contentType,
      }));
      return res.json({ ok: true, items });
    } catch (error) {
      console.error("files list error:", error);
      return res.status(500).json({
        ok: false,
        error: error instanceof Error ? error.message : "List failed",
      });
    }
  });
}
