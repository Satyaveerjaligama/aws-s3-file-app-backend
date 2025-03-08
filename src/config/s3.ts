import { S3Client } from "@aws-sdk/client-s3";
import { ENV } from "./env";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID!,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY!,
  },
  region: ENV.AWS_REGION,
});
