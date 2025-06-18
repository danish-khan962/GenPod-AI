import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./src/config/db.js"
import episodeRoutes from "./src/routes/episode.routes.js"
import errorHandler from "./src/middlewares/errorHandler.middlewares.js"

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

//connection establishment with MongoDB
connectDB();
app.use("/api/episodes", episodeRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("GenPod API is running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Backend Server Working on PORT: ${PORT}`);
})

