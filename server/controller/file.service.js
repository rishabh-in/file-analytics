import { processFile, generateAndDownloadMaskFile } from "../helper/fileServiceHelper.js";
import {v4 as uuidv4} from 'uuid';
import fileModel from '../model/file.model.js';
import wordModel from '../model/word.model.js';
import { soc } from "../index.js";
import fs from 'fs';

export const handleFetchUploadedFiles = async(req, res) => {
  try {
    const fileData = await fileModel.find({});
    res.status(200).json({message: "Files fetched successfully", data: fileData});
  } catch (error) {
    console.log(error)
  }
}

export const handleUploadFiles = async (req, res) => {
  try {
    const {maskTerms, maskTermArray} = req.body;
    const {files} = req;
    const promiseArray = files.map(file => processFile(file));
    Promise.all(promiseArray).then((data) => {

      // Perform DB orperation and after finishing db operation emit a notification
      data.forEach( async element => {
        let fileObj = {
          fileId: uuidv4(),
          originalFileName: element.originalName,
          uniqueFileName: element.uniqueName,
          fileSize: (element.size / 1000),
          totalWordCount: element.words.length,
          uniqueWordCount: element.uniqueWordsArray.length,
        }
        // Store the file details in DB
        await fileModel.create(fileObj);
        
        const wordDataArray = [];
        element.uniqueWordsArray.forEach((w) => {
          const wordObj = {
            fileId: fileObj.fileId,
            word: w,
            originalFileName: fileObj.originalFileName,
            uniqueFileName: fileObj.uniqueFileName,
            totalCount: element.uniqueWordMap[w],
          }
          element.synonyms.forEach((syn) => {
            if(syn?.[w]) {
              wordObj["synonyms"] = syn[w]
            }
          })
          wordDataArray.push(wordObj);
        })
        // store unique word details in db
        await wordModel.insertMany(wordDataArray);
      });

      console.log("Files and words stored in DB")
      // Notify user that files are processed
      soc.emit('file processing done');
    }).catch((err) => {
      console.log("Error in processing files.", err.message)
      soc.emit('error', ("Error in processing files." + err.message));
      files.forEach(element => {
        fs.unlink(element.path, (err) => {
          console.log("error", err);
        });  
      });
    })
    if(maskTerms) {
      // do the transformation and return the new file in response.
      let newMaskTermArray = maskTermArray.split(",").map((val) => val.trim())
      generateAndDownloadMaskFile(res, files, newMaskTermArray);
    } else {
      res.status(200).json({message: "Operation has started"})

    }
  } catch (error) {
    console.log(error);
  }
}

export const handleFetchWordCountDetails = async (req, res) => {
  try {
    const {id} = req.params
    const uniqueWordDetails = await wordModel.find({fileId: id});
    res.status(200).json({message: "Fetched word count details", data: uniqueWordDetails});
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const handleDownloadMaskedFile = (req, res) => {
  try {
    const {fileId, uniqueFileName, maskTermsArray} = req.body;
    generateAndDownloadMaskFile(res, uniqueFileName, maskTermsArray);
  } catch (error) {
    console.log(error);
  }
}

export const handleDeleteFile = async(req, res) => {
  try {
    const {fileId} = req.params;
    await fileModel.deleteOne({fileId});
    await wordModel.deleteMany({fileId});
    res.status(200).json({message: "File delete"})
  } catch (error) {
    console.log(error);
  }
}

