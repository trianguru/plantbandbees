import type { Express } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Resend } from "resend";
import { authStorage } from "./storage";
import { z } from "zod";
import { subscribeToNewsletter, unsubscribeFromNewsletter } from "../../lib/mailchimp";

const resend = new Resend(process.env.RESEND_API_KEY);

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  newsletterOptIn: z.boolean().optional().default(false),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const SALT_ROUNDS = 10;

// Register auth-specific routes
export function registerAuthRoutes(app: Express): void {
  // Get current authenticated user
  app.get("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await authStorage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const { hashedPassword: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Sign up
  app.post("/api/auth/signup", async (req: any, res) => {
    try {
      const { email, password, name, newsletterOptIn } = signupSchema.parse(req.body);

      const existing = await authStorage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "An account with that email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || null;

      const user = await authStorage.upsertUser({
        email,
        firstName,
        lastName,
        hashedPassword,
        newsletterOptedIn: newsletterOptIn,
      });

      req.session.userId = user.id;
      await new Promise<void>((resolve, reject) => {
        req.session.save((err: Error | null) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const { hashedPassword: _, ...safeUser } = user;
      res.status(201).json({ message: "Account created successfully", user: safeUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Log in
  app.post("/api/auth/login", async (req: any, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await authStorage.getUserByEmail(email);
      if (!user || !user.hashedPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user.id;
      await new Promise<void>((resolve, reject) => {
        req.session.save((err: Error | null) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const { hashedPassword: _, ...safeUser } = user;
      res.json({ message: "Logged in successfully", user: safeUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  // Log out
  app.post("/api/auth/logout", (req: any, res) => {
    req.session.destroy((err: Error | null) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  // Update profile
  app.patch("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const updateSchema = z.object({
        firstName: z.string().min(1).optional(),
        lastName: z.string().optional(),
        newsletterOptedIn: z.boolean().optional(),
      });

      const updates = updateSchema.parse(req.body);

      const currentUser = await authStorage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await authStorage.updateUser(req.session.userId, updates);
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update profile" });
      }

      // Sync newsletter preference with Mailchimp if it changed
      if (
        updates.newsletterOptedIn !== undefined &&
        updates.newsletterOptedIn !== currentUser.newsletterOptedIn &&
        currentUser.email
      ) {
        const firstName = updatedUser.firstName ?? "";
        const lastName = updatedUser.lastName ?? "";
        if (updates.newsletterOptedIn) {
          subscribeToNewsletter(currentUser.email, firstName, lastName).catch((err) =>
            console.error("Mailchimp subscribe error:", err)
          );
        } else {
          unsubscribeFromNewsletter(currentUser.email).catch((err) =>
            console.error("Mailchimp unsubscribe error:", err)
          );
        }
      }

      const { hashedPassword: _, ...safeUser } = updatedUser;
      res.json({ message: "Profile updated", user: safeUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Forgot password — send reset email
  app.post("/api/auth/forgot-password", async (req: any, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);

      const user = await authStorage.getUserByEmail(email);
      // Always respond 200 to avoid leaking which emails exist
      if (!user) {
        return res.json({ message: "If that email exists, a reset link has been sent." });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + RESET_TOKEN_TTL_MS);
      await authStorage.setResetToken(user.id, token, expiry);

      const baseUrl = process.env.APP_URL ?? "https://plantbandbees.com";
      const resetUrl = `${baseUrl}/reset-password?token=${token}`;

      await resend.emails.send({
        from: "Plant Band Bees <no-reply@plantbandbees.com>",
        to: email,
        subject: "Reset your Plant Band Bees password",
        html: `
          <p>Hi ${user.firstName ?? "there"},</p>
          <p>Click the link below to reset your password. It expires in 1 hour.</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you didn't request this, you can ignore this email.</p>
        `,
      });

      res.json({ message: "If that email exists, a reset link has been sent." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Failed to send reset email" });
    }
  });

  // Reset password — consume token, set new password
  app.post("/api/auth/reset-password", async (req: any, res) => {
    try {
      const { token, password } = z
        .object({
          token: z.string().min(1),
          password: z.string().min(8, "Password must be at least 8 characters"),
        })
        .parse(req.body);

      const user = await authStorage.getUserByResetToken(token);
      if (!user || !user.resetTokenExpiry) {
        return res.status(400).json({ message: "Invalid or expired reset link" });
      }

      if (user.resetTokenExpiry < new Date()) {
        return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await authStorage.setResetToken(user.id, null, null);
      await authStorage.upsertUser({ ...user, hashedPassword });

      res.json({ message: "Password updated successfully. You can now log in." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  });
}
