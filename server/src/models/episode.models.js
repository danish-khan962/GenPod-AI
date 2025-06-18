import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    transcript: {
      type: String,
      trim: true,
      default: "",
    },
    audioUrl: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: String,
      trim: true,
      default: "",
    },
    hosts: {
      type: String,
      trim: true,
      default: "",
    },
    length: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Episode = mongoose.model("Episode", episodeSchema);
