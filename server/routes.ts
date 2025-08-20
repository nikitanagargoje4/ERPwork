import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { readFileSync } from "fs";
import { join } from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Finance data endpoint
  app.get("/api/finance-data", (req, res) => {
    try {
      const financeDataPath = join(process.cwd(), "public", "data", "finance-data.json");
      const financeData = readFileSync(financeDataPath, "utf-8");
      const parsedData = JSON.parse(financeData);
      res.json(parsedData);
    } catch (error) {
      console.error("Error reading finance data:", error);
      res.status(500).json({ error: "Failed to load finance data" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
