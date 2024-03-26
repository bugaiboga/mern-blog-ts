import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import router from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(fileUpload({}));
app.use("/api/images", express.static(path.join(__dirname, "images")));
app.use("/api", router);

const start = () => {
  const { PORT, DOMEN, DB_API } = process.env;
  app.listen(PORT, () => {
    console.log(`server start ${DOMEN}:${PORT}`);
  });

  if (DB_API) {
    mongoose
      .connect(DB_API)
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((e) => {
        console.error(`Database error: ${e}`);
      });
  }
};

start();
