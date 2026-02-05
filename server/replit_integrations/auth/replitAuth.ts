import session from "express-session";
import type { Express, RequestHandler } from "express";
import MemoryStore from "memorystore";
import { authStorage } from "./storage";

// Mock user for local development
const MOCK_USER = {
  id: "local-dev-user-001",
  email: "host@knoxvillegreenstay.com",
  firstName: "Demo",
  lastName: "Host",
  profileImageUrl: "https://i.pravatar.cc/150?u=demo-host",
};

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export function getSession() {
  const MemStore = MemoryStore(session);
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week

  return session({
    secret: process.env.SESSION_SECRET || "local-dev-secret-change-in-production",
    store: new MemStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false for local dev (no HTTPS)
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.use(getSession());

  // Ensure mock user exists in database
  await authStorage.upsertUser(MOCK_USER);

  // Login route - auto-login as mock user for local dev
  app.get("/api/login", async (req, res) => {
    req.session.userId = MOCK_USER.id;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Login failed" });
      }
      res.redirect("/dashboard");
    });
  });

  // Logout route
  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
      }
      res.redirect("/");
    });
  });
}

// Middleware to check if user is authenticated
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Helper to make req.isAuthenticated() and req.user work
export function attachUserToRequest(app: Express) {
  app.use(async (req: any, res, next) => {
    req.isAuthenticated = () => !!req.session.userId;

    if (req.session.userId) {
      const user = await authStorage.getUser(req.session.userId);
      req.user = user ? { claims: { sub: user.id }, ...user } : null;
    } else {
      req.user = null;
    }
    next();
  });
}
