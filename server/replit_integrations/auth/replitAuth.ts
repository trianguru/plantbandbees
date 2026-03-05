import session from "express-session";
import type { Express, RequestHandler } from "express";
import MemoryStore from "memorystore";
import { authStorage } from "./storage";

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
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.use(getSession());
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
