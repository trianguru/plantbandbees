// Vercel serverless function - imports the Express app
// Uses createRequire to load CJS bundle from ESM module context
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const app = require('../dist/vercel.js');
export default app.default || app;
