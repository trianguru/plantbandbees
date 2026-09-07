# Deployment proof — Plant B&Bs (Phase 2+3 bot endpoints)

## Production project

- **Vercel project name:** `plantbandbees` (not `airbnb-green-service`)
- **Git repo:** `trianguru/plantbandbees`, production branch **`main`**
- Domains for the marketing/app site (`.com`) were moved from the old `airbnb-green-service` project onto **`plantbandbees`**. Do **not** delete the old Vercel project unless you intentionally retire it; it may still hold unused aliases.

Live main at cutover time referenced SHA `ef2f5ed` serving Plant B&Bs branding correctly.

## Domains to attach (Vercel)

In the **`plantbandbees`** Vercel project → Settings → Domains, add:

1. `ingest.plantbandbees.com`
2. `files.plantbandbees.com`

Both should resolve to the same deployment as `plantbandbees.com` (Express catch-all via `api/index.js`). Host-aware health lives at `GET /health` only when `Host` contains `ingest.`; `GET /ingest/health` works on every host.

## Cloudflare DNS

In the Cloudflare zone for `plantbandbees.com`:

| Type  | Name   | Target                 | Proxy        |
|-------|--------|------------------------|--------------|
| CNAME | ingest | `cname.vercel-dns.com` | DNS only (grey cloud) recommended first |
| CNAME | files  | `cname.vercel-dns.com` | DNS only (grey cloud) recommended first |

After Vercel SSL is issued and routes work, you can re-enable the orange cloud if desired. Grey cloud first avoids SSL/proxy mismatches during setup.

## Environment variables (Vercel Production)

Set on project **`plantbandbees`** → Settings → Environment Variables (Production):

| Name | Purpose |
|------|---------|
| `INGEST_TOKEN` | Shared secret for ingest routes (`Authorization: Bearer …` or `X-API-Key`) |
| `FILES_TOKEN` | Shared secret for files routes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token |

Generate strong random tokens (e.g. `openssl rand -hex 32`). Do not commit real values. Placeholders belong only in `.env.example`.

Redeploy after changing env vars so serverless functions pick them up.

## Create a Vercel Blob store

1. Vercel dashboard → Storage → Create → **Blob**
2. Choose access mode **Public** (this app uses `put(..., { access: 'public' })` for simple URL fetch after our own token gate). If you later want private-only blobs, create a private store and switch SDK calls to `access: 'private'` + `get()`.
3. Connect / link the store to the **`plantbandbees`** project.
4. Vercel injects `BLOB_READ_WRITE_TOKEN` into the linked environments, or copy the token into Production env manually.
5. Confirm Production has the token, then redeploy.

## Body size notes

- Application parsers accept up to ~**25MB**.
- **Vercel serverless request body limit is ~4.5MB**. Uploads larger than that through these Express routes will fail with 413 at the platform layer. For bigger files, use Vercel Blob client uploads or an external uploader; no `vercel.json` knob raises the platform limit.
- `vercel.json` remains a catch-all to `api/index.js` — no change required for domains or Blob.

## Smoke checklist after merge + domain/env setup

```bash
curl -sS https://ingest.plantbandbees.com/health
curl -sS -X POST https://ingest.plantbandbees.com/ingest \
  -H "Authorization: Bearer $INGEST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ping":true}'
curl -sS https://ingest.plantbandbees.com/ingest/dumps \
  -H "Authorization: Bearer $INGEST_TOKEN"

curl -sS -X PUT https://files.plantbandbees.com/files/hello.txt \
  -H "Authorization: Bearer $FILES_TOKEN" \
  -H "Content-Type: text/plain" \
  -d 'hi'
curl -sS https://files.plantbandbees.com/files/hello.txt \
  -H "Authorization: Bearer $FILES_TOKEN"
curl -sS https://files.plantbandbees.com/files \
  -H "Authorization: Bearer $FILES_TOKEN"
```

Confirm Shop / Subscriptions / Waitlist / Host Login / Stripe still work on `plantbandbees.com` after deploy (bot routes are separate and do not use session auth).
