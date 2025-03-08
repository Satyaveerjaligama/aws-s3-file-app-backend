import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3";
import { ENV } from "../config/env";

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: ENV.S3_BUCKET_NAME!,
    metadata: (_, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
