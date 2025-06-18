import express from "express";
import {
  generateEpisode,
  createEpisode,
  getUserEpisodes,
  deleteEpisode,
  saveEpisode,
} from "../controllers/episode.controllers.js";
import { authenticateRequest } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public
router.post("/generate", generateEpisode);

// Protected
router.post("/", authenticateRequest, createEpisode);
router.post("/save", authenticateRequest, saveEpisode);
router.get("/", authenticateRequest, getUserEpisodes);
router.delete("/:id", authenticateRequest, deleteEpisode);

export default router;
