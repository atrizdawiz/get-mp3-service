import cors from "cors";
import express from "express";
import youtubeClient from "./clients/youtubeClient";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

const port = 3000;

app.get("/get-mp3/:youtubeId", async (req, res) => {
  const { youtubeId } = req.params;
  try {
    await youtubeClient.downloadMp3(youtubeId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: "bad" });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
