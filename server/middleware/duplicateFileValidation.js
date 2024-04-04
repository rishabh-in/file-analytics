import fileModel from '../model/file.model.js'

const duplicateFileValidation = async (req, res, next) => {
  try {
    const {files} = req;
    console.log(files)
    const orQuery = files.map((file) => {
      let query = {originalFileName: file.originalname}
      return query;
    });
    const result = await fileModel.find({"$or": orQuery});
    if(result.length > 0) {
      res.status(400).json({error: "File already exist"})
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

export default duplicateFileValidation;