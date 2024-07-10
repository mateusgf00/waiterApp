import express from "express";
import path from 'node:path'
import mongoose from "mongoose";
import { router } from "./router";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, "..", "uploads")))
    app.use(express.json());
    app.use(router)

    app.listen(port, () => {
      console.log(`🚀 Server s running on http://localhost:${port}`);
    });

    console.log("conectado ao mongodb");
  })
  .catch(() => console.log("erro ao conectar ao mongodb"));