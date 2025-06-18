import mongoose from "mongoose";
import { Episode } from "../models/episode.models.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from "openai";
import { dirname } from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// AI GENERATION - PUBLIC
export const generateEpisode = async (req, res) => {
  try {
    const { prompt, hosts, length } = req.body;

    if (!prompt || !hosts || !length) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1. Generate Transcript with GPT
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a podcast script writer. Generate an engaging transcript for a ${length}-minute episode with ${hosts} host(s) about: ${prompt}`,
        },
        { role: "user", content: `Start with a hook, include main points, and wrap up naturally.` },
      ],
      model: "gpt-3.5-turbo",
    });

    const transcript = chatCompletion.choices[0].message.content;

    // 2. Generate TTS Audio
    const speechResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: transcript,
    });

    const localAudioPath = path.resolve(__dirname, '../temp/generated-episode.mp3');
    const stream = speechResponse.body;
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    await fs.writeFile(localAudioPath, buffer);


    // 3. Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localAudioPath, {
      resource_type: "video",
      folder: "genpod-audio",
    });

    await fs.unlink(localAudioPath);

    res.status(200).json({ transcript, audioUrl: uploadResult.secure_url });
  } catch (error) {
    console.error("Error generating/saving episode:", error?.response?.data || error.message || error);
    res.status(500).json({ message: "Generation failed" });
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
