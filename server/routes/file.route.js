import express from 'express';
import { handleDownloadMaskedFile, handleFetchUploadedFiles, handleUploadFiles } from '../controller/file.service.js';
import { upload } from '../utils/storage.js';
const router = express.Router();

router.get("/files", handleFetchUploadedFiles);
router.post("/files/upload",upload.array('files', 5), handleUploadFiles);
router.get("/files/:id/download", handleDownloadMaskedFile);

export default router;