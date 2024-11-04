"use strict"
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
    createSubject,
    deleteSubject,
    getSubject,
    getSubjects,
    updateSubject,
} from "../controllers/subject.controller.js";

const router = Router();

// Asignar a admin crear asignaturas y ver al jefe de UTP
router
    .get("/all", getSubjects) //funciona
    .get("/detail/", getSubject) //funciona
    .post("/", createSubject) //funciona
    .patch("/detail/", updateSubject) // falta probar
    .delete("/detail/", deleteSubject); // borra el que no es (puse física y borro matemáticas)

export default router;