import express from 'express';
import { handleDeleteFile, handleDownloadMaskedFile, handleFetchUploadedFiles, handleFetchWordCountDetails, handleUploadFiles } from '../controller/file.service.js';
import { upload } from '../utils/storage.js';
import duplicateFileValidation from '../middleware/duplicateFileValidation.js';
const router = express.Router();

router.get("/files", handleFetchUploadedFiles);
router.get("/files/:id/words", handleFetchWordCountDetails)
router.post("/files/upload" ,upload.array('files', 5), duplicateFileValidation, handleUploadFiles);
router.post("/files/:id/download", handleDownloadMaskedFile);
router.delete("/file/:fileId", handleDeleteFile);

export default router;