import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const generateLogs = (req, res, next) => {
  try {
    console.log()
    let log = `${Date.now()}: ${req.method} ${req.path} \n`
    console.log(log)
    fs.appendFile("../logs/logs.txt", log, (err) => {
      if(err) return new Error(err);
      next();
    })
  } catch (error) {
    console.log(error)
  }
}

export default generateLogs;