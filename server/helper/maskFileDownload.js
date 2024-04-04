import {Transform, pipeline} from 'stream';
import fs from 'fs';


const generateAndDownloadMaskFile = (res, files, maskWordArray) => {
  try {
    const readStream = fs.createReadStream(files[0].path);
    const outputFileName = "uploads/masked_" + files[0].path.split("/")[1];
    const writeStream = fs.createWriteStream(outputFileName);

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
        res.download(outputFileName);
      }
    })

  } catch (error) {
    console.log(error)
    throw new Error(err)
  }
}

export default generateAndDownloadMaskFile