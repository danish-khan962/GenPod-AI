import mongoose from "mongoose";
import { Episode } from "../models/episode.models.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs/promises';
import path from 'path';
import axios from "axios";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CREATE
export const createEpisode = async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const { prompt, hosts, length, transcript, audioUrl } = req.body;

  // Save to DB (e.g., MongoDB)
  const episode = await EpisodeModel.create({
    userId,
    prompt,
    hosts,
    length,
    transcript,
    audioUrl,
  });

  res.status(200).json(episode);
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

    if (episode.userId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Unauthorized to delete this episode" });
    }

    await episode.deleteOne();
    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    console.error("Error deleting episode:", error);
    res.status(500).json({ message: "Failed to delete episode" });
  }
};

// AI GENERATION using ElevenLabs
export const generateEpisode = async (req, res) => {
  try {
    const { transcript, voiceId = "SAz9YHcvj6GT2YYXdXww" } = req.body;

    if (!transcript) {
      return res.status(400).json({ message: "Transcript is required" });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voice = voiceId; // default voice or pass custom from client

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        text: transcript,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const localAudioPath = path.resolve(__dirname, '../temp/generated-episode.mp3');
    await fs.writeFile(localAudioPath, Buffer.from(response.data));

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localAudioPath, {
      resource_type: "video",
      folder: "genpod-audio",
    });

    await fs.unlink(localAudioPath);

    res.status(200).json({ transcript, audioUrl: uploadResult.secure_url });
  } catch (error) {
    console.error("Error generating episode:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate episode" });
  }
};

// SAVE EPISODE
export const saveEpisode = async (req, res) => {
  try {
    const { prompt, hosts, length, transcript, audioUrl } = req.body;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEpisode = new Episode({
      userId,
      prompt,
      hosts,
      length,
      transcript,
      audioUrl,
    });

    await newEpisode.save();
    res.status(201).json(newEpisode);
  } catch (error) {
    console.error("Error saving episode:", error);
    res.status(500).json({ message: "Failed to save episode" });
  }
};
