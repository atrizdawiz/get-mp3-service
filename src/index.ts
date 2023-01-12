import cors from "cors";
import express from "express";
import { STATUS_CODES } from "http";
import youtubeClient from "./clients/youtubeClient";

const app = express();
declare global {
  namespace Express {
    interface Request {
      userData: any;
    }
  }
}
app.use(cors());
app.options("*", cors());
app.use(express.json());

const port = 3000;

app.get("/get-mp3/:youtube", async (req, res) => {
  const youtubeId = req.params.youtube;
  try {
    await youtubeClient.downloadMp3(youtubeId);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: "bad" });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
