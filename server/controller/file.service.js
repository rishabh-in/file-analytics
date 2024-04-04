import { processFile, generateAndDownloadMaskFile } from "../helper/fileServiceHelper.js";
import {v4 as uuidv4} from 'uuid';
import fileModel from '../model/file.model.js';
import wordModel from '../model/word.model.js';
import axios from "axios";

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
    const {maskTerms, maskWordArray} = req.body;
    const {files} = req;
    const promiseArray = files.map(file => processFile(file));
    Promise.all(promiseArray).then((data) => {

      // Perform DB orperation and after finishing db operation emit a notification
      data.forEach( async element => {
        try {
          let fileObj = {
            fileId: uuidv4(),
            originalFileName: element.originalName,
            uniqueFileName: element.uniqueName,
            fileSize: element.size,
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

          // Notify user that files are processed
        } catch (error) {
          console.log(error)
          // res.status(400).json({message: error})
        }
        
      });
    }).catch((err) => {
      console.log(err)
    })
    if(maskTerms) {
      // do the transformation and return the new file in response.
      let newMaskWordArray = maskWordArray.split(",").map((val) => val.trim())
      generateAndDownloadMaskFile(res, files, newMaskWordArray);
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
    
  } catch (error) {
    console.log(error);
  }
}

