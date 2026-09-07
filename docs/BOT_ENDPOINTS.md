# Bot endpoints (ingest + files)

Token-gated endpoints for ingest dumps and simple file storage. Durable storage is **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`). Do not rely on local disk.

Environment variables (set in Vercel Production; see also `.env.example`):

- `INGEST_TOKEN` — Bearer / `X-API-Key` for ingest routes
- `FILES_TOKEN` — Bearer / `X-API-Key` for files routes
- `BLOB_READ_WRITE_TOKEN` — from a Vercel Blob store linked to the project

Auth header forms (either works):

```http
Authorization: Bearer INGEST_TOKEN
X-API-Key: INGEST_TOKEN
```

Replace `INGEST_TOKEN` / `FILES_TOKEN` below with the real secrets. Prefer `https://ingest.plantbandbees.com` and `https://files.plantbandbees.com` once those domains are attached; the same paths also work on `https://plantbandbees.com`.

---

## Health

```bash
# On ingest host
curl -sS https://ingest.plantbandbees.com/health

# Always available on any host
curl -sS https://plantbandbees.com/ingest/health
```

Expected: `{"ok":true}`

---

## Ingest

### POST `/ingest`

Accepts `application/json`, `text/plain`, `application/x-www-form-urlencoded`, `multipart/form-data` (fields `file` or `data`), and `application/octet-stream`.

Optional query params: `source`, `label`.

```bash
# JSON
curl -sS -X POST "https://ingest.plantbandbees.com/ingest?source=bot&label=test" \
  -H "Authorization: Bearer INGEST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"hello":"world"}'

# Plain text
curl -sS -X POST "https://ingest.plantbandbees.com/ingest" \
  -H "X-API-Key: INGEST_TOKEN" \
  -H "Content-Type: text/plain" \
  -d 'raw payload from device'

# Multipart file
curl -sS -X POST "https://ingest.plantbandbees.com/ingest?source=upload" \
  -H "Authorization: Bearer INGEST_TOKEN" \
  -F "file=@./sample.bin" \
  -F "note=optional field"
```

Success: `{"ok":true,"id":"<uuid>","received_at":"<iso>"}`

Wrapper JSON is stored in Blob at `ingest/<id>.json`. Multipart binaries are stored at `ingest/<id>/file-<safeName>`.

### GET `/ingest` or `/ingest/dumps`

```bash
curl -sS https://ingest.plantbandbees.com/ingest/dumps \
  -H "Authorization: Bearer INGEST_TOKEN"

# Optional HTML listing
curl -sS https://ingest.plantbandbees.com/ingest/dumps \
  -H "Authorization: Bearer INGEST_TOKEN" \
  -H "Accept: text/html"
```

---

## Files

### PUT or POST `/files/:name`

`:name` may only contain alphanumeric characters, `.`, `_`, `-` (no path traversal).

```bash
curl -sS -X PUT "https://files.plantbandbees.com/files/report.txt" \
  -H "Authorization: Bearer FILES_TOKEN" \
  -H "Content-Type: text/plain" \
  --data-binary @./report.txt

curl -sS -X POST "https://files.plantbandbees.com/files/note.json" \
  -H "X-API-Key: FILES_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"ok"}'
```

Success: `{"ok":true,"name":"report.txt","url":"https://..."}`

### GET `/files/:name`

```bash
curl -sS "https://files.plantbandbees.com/files/report.txt" \
  -H "Authorization: Bearer FILES_TOKEN" \
  -o report.txt
```

### GET `/files`

```bash
curl -sS "https://files.plantbandbees.com/files" \
  -H "Authorization: Bearer FILES_TOKEN"
```

---

## Limits

- App-level body limit is ~25MB.
- **Vercel Functions** still enforce a **~4.5MB request body** limit for server-side uploads. Larger payloads need Blob client uploads or another path; see `docs/DEPLOYMENT_PROOF.md`.
