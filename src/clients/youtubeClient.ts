import readline from "readline";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

const createDownloadDirectoryIfNonExistent = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const getTitle = (id: string) => {
  return ytdl.getBasicInfo(id).then((info) => info.videoDetails.title);
};
const localFolderFromEnv = process.env.LOCAL_DOWNLOAD_FOLDER;
const downloadFolder =
  localFolderFromEnv ?? path.join(__dirname, "../..", "downloads");

const downloadMp3 = async (id: string) => {
  if (!ytdl.validateID(id)) {
    throw new Error("Invalid youtube id provided");
  }

  createDownloadDirectoryIfNonExistent(downloadFolder);

  let stream;
  try {
    stream = await ytdl(id, {
      quality: "highestaudio",
    });
  } catch (error) {
    throw new Error("Could not find stream");
  }

  let title: string;
  try {
    title = await getTitle(id);
  } catch {
    console.error("Failed to get title");
    title = id;
  }

  let start = Date.now();
  ffmpeg(stream)
    .audioBitrate(256)
    .save(`${downloadFolder}/${title.replace("/", "")}.mp3`)
    .on("progress", (p) => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on("end", () => {
      console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
    });
};

export default { downloadMp3 };
