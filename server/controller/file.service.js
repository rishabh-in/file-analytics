import { processFile } from "../helper/fileServiceHelper.js";

export const handleFetchUploadedFiles = (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    console.log(error)
  }
}

export const handleUploadFiles = async (req, res) => {
  try {
    const {name} = req.body;
    const {files} = req;
    const promiseArray = files.map(file => processFile(file.path));
    Promise.all(promiseArray).then((data) => {
      // Perform DB orperation and after finishing db operation emit a notification
      data.forEach(element => {
        console.log(element)
      });
    })
    console.log("Operation finished");
  } catch (error) {
    console.log(error);
  }
}

export const handleDownloadMaskedFile = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

