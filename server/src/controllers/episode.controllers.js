import mongoose from "mongoose";
import { Episode } from "../models/episode.models.js";

// CREATE
export const createEpisode = async (req, res) => {
  try {
    const userId = req.user.sub; 
    const { title, transcript, audioUrl, duration, hosts, length } = req.body;

    if (!title || !audioUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEpisode = await Episode.create({ userId, title, transcript, audioUrl, duration, hosts, length });

    res.status(201).json(newEpisode);
  } catch (error) {
    console.error("Error creating episode:", error);
    res.status(500).json({ message: "Failed to create episode" });
  }
};

// READ
export const getUserEpisodes = async (req, res) => {
  try {
    const userId = req.user.sub;
    const episodes = await Episode.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(episodes);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    res.status(500).json({ message: "Failed to fetch episodes" });
  }
};

// DELETE
export const deleteEpisode = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    // Optional: Check if the episode belongs to the user
    if (episode.userId !== req.user.sub) {
      return res.status(403).json({ message: "Unauthorized to delete this episode" });
    }

    await episode.deleteOne();
    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    console.error("Error deleting episode:", error);
    res.status(500).json({ message: "Failed to delete episode" });
  }
};
