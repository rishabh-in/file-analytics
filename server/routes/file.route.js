import express from 'express';
import { handleDownloadMaskedFile, handleFetchUploadedFiles, handleUploadFiles } from '../controller/file.service.js';
const router = express.Router();

router.get("/files", handleFetchUploadedFiles);
router.post("/files/upload", handleUploadFiles);
router.get("/files/:id/download", handleDownloadMaskedFile);

export default router;