import cors from "cors";
import express from "express";
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

app.get("/:youtube", (req, res) => {
  const youtubeId = req.params.youtube;

  youtubeClient.downloadMp3(youtubeId);

  res.status(200).send({ id: youtubeId });
});

app.listen(port, () => console.log(`Running on port ${port}`));
