import fileModel from '../model/file.model.js'
import fs from 'fs';
const duplicateFileValidation = async (req, res, next) => {
  try {
    const {files} = req;
    const orQuery = files.map((file) => {
      let query = {originalFileName: file.originalname}
      return query;
    });
    const result = await fileModel.find({"$or": orQuery});
    if(result.length > 0) {
      files.forEach(element => {
        fs.unlink(element.path, (err) => {
          console.log("error", err);
        });  
      });
      res.status(400).json({error: "File already exist"})
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

export default duplicateFileValidation;