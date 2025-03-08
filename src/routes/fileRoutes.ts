import express from "express";
import { upload } from "../middleware/upload";
import {
  uploadFile,
  deleteFile,
  downloadFile,
  getFiles,
} from "../controllers/fileControllers";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.delete("/delete/:fileName", deleteFile);
router.get("/download/:filename", downloadFile);
router.get("/get-files", getFiles);

export default router;
