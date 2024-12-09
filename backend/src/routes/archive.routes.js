"use strict"
import { Router } from "express";
import { getArchivos, uploadArchive } from "../controllers/archivo.controller.js";
import { handleFileSizeLimit , upload } from "../middlewares/uploadArchive.middleware.js";

const router = Router();

router
    .post("/", upload.single("archivo"), handleFileSizeLimit, uploadArchive)
    .get("/", getArchivos);
export default router;