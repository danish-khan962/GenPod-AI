import express from "express";
import { createEpisode, getUserEpisodes, deleteEpisode } from "../controllers/episode.controllers.js";
import { authenticateRequest } from "../middlewares/auth.middlewares.js.js";

const router = express.Router();

router.post("/", authenticateRequest, createEpisode);
router.get("/", authenticateRequest, getUserEpisodes); // ✅ updated
router.delete("/:id", authenticateRequest, deleteEpisode);

export default router;
