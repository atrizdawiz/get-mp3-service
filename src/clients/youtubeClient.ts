import readline from "readline";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

const downloadMp3 = (id: string) => {
  const downloadFolder = path.join(__dirname, "../..", "downloads");

  let stream = ytdl(id, {
    quality: "highestaudio",
  });

  let start = Date.now();
  ffmpeg(stream)
    .audioBitrate(256)
    .save(`${downloadFolder}/${id}.mp3`)
    .on("progress", (p) => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on("end", () => {
      console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
    });
};

export default { downloadMp3 };
