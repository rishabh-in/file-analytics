import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const generateLogs = (req, res, next) => {
  try {
    const logFilePath = path.resolve("logs/logs.txt");
    let log = `${Date.now()}: ${req.method} ${req.path} \n`
    fs.appendFile(logFilePath, log, (err) => {
      if(err) return new Error(err);
      next();
    })
  } catch (error) {
    console.log(error)
  }
}

export default generateLogs;