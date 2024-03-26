import { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";
import { AuthenticatedRequest } from "./authMiddleware.js";

export interface RequestFileUpload extends AuthenticatedRequest {
  filePath?: any;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(__dirname, "../");
const imagesDirectory = path.join(rootDirectory, "images");

const uploadImageMiddleware = (
  req: RequestFileUpload,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.files.file as fileUpload.UploadedFile;

  if (!file.mimetype.startsWith("image")) {
    return res.status(400).json({ message: "Uploaded file is not an image" });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(imagesDirectory, fileName);

  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  file.mv(uploadPath, (err: Error) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }
    req.filePath = `/images/${fileName}`;
    next();
  });
};

export default uploadImageMiddleware;
