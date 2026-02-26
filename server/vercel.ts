import { fileURLToPath } from 'url';
import { dirname } from 'path';
// ESM shim for __dirname (not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
await registerRoutes(null as any, app);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
}

// Export for Vercel serverless
export default app;
