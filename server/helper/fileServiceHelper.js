import {Worker} from 'worker_threads';
import {Transform, pipeline} from 'stream';
import fs from 'fs';


export const processFile = (file) => {
  return new Promise((resolve, reject) => {
      const worker = new Worker('./helper/worker.js', { workerData: { file } });
      worker.on('message', resolve);
      worker.on('error', (err) => {
        reject(err)
      });
      worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
  });
}

export const generateAndDownloadMaskFile = (res, fileName, maskWordArray) => {
  try {
    const readStream = fs.createReadStream("uploads/"+path);
    const outputFileNamePath = "uploads/masked_" + files[0].path.split("/")[1];
    const outputFileName = outputFileNamePath.split("/")[1];
    const writeStream = fs.createWriteStream(outputFileNamePath);

    const masking = new Transform({
      transform(chunk, encoding, callback) {
        let data = chunk.toString();
        maskWordArray.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            data = data.replace(regex, '***');
        });
        this.push(data);
        callback();
      }
    })
    pipeline(readStream, masking, writeStream, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log("pipeline successful");
        res.download(outputFileNamePath, outputFileName);
      }
    })

  } catch (error) {
    console.log(error)
    throw new Error(err)
  }
}