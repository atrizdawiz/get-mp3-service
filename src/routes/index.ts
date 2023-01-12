import express from "express";
import youtubeClient from "../clients/youtubeClient";

const router = express.Router();

router.get("/hej", (req, res) => {
  youtubeClient.downloadMp3("7wNb0pHyGuI");

  res.json({ status: "ok" });
});

export default router;
