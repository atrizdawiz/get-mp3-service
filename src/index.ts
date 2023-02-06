import cors from "cors";
import express from "express";
import youtubeClient from "./clients/youtubeClient";
import path from "path";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

const port = 5001;

app.get("/get-mp3/:youtubeId", async (req, res) => {
  const { youtubeId } = req.params;
  try {
    await youtubeClient.downloadMp3(youtubeId);
    res.json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ status: "bad" });
  }
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => console.log(`Running on port ${port}`));
