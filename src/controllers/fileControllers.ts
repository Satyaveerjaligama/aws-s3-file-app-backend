import { Request, Response } from "express";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { s3 } from "../config/s3";
import { ENV } from "../config/env";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ message: "Uploaded successfully" });
};

export const deleteFile = async (req: Request, res: Response) => {
  const fileDetails = {
    Bucket: ENV.S3_BUCKET_NAME,
    Key: req.params.fileName,
  };

  try {
    await s3.send(new DeleteObjectCommand(fileDetails));
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting file" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  const fileName = req.params.filename;
  const params = { Bucket: ENV.S3_BUCKET_NAME, Key: fileName };

  try {
    const command = new GetObjectCommand(params);
    const { Body } = await s3.send(command);

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    if (Body instanceof Readable) {
      Body.pipe(res);
    } else {
      const stream = Readable.from(Body as any);
      stream.pipe(res);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to download file" });
  }
};

export const getFiles = async (_: Request, res: Response) => {
  const params = { Bucket: ENV.S3_BUCKET_NAME };

  try {
    const response = await s3.send(new ListObjectsV2Command(params));
    const files = response.Contents?.map((file) => file.Key);
    res.status(200).send(files);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
