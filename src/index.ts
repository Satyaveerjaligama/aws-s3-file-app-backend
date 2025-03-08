import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/files", fileRoutes);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.APP_PORT}`);
});
