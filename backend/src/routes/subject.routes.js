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
    .get("/all", authorizeRoles("administrador" , "jefe de utp"), getSubjects) 
    .get("/detail/", authorizeRoles("administrador" , "jefe de utp"), getSubject) 
    .post("/", authorizeRoles("administrador"), createSubject) 
    .patch("/detail/",authorizeRoles("administrador"), updateSubject) 
    .delete("/detail/", authorizeRoles("administrador"), deleteSubject); 

export default router;