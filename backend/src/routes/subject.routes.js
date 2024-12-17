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

router.use(authenticateJwt);

// Asignar a admin crear asignaturas y ver al jefe de UTP
router
    .get("/", authorizeRoles("administrador" , "jefe de utp", "docente"), getSubjects) 
    .post("/", authorizeRoles("administrador"), createSubject) 
    .get("/detail/", authorizeRoles("administrador" , "jefe de utp"), getSubject) 
    .patch("/detail/",authorizeRoles("administrador"), updateSubject) 
    .delete("/detail/", authorizeRoles("administrador"), deleteSubject); 

export default router;