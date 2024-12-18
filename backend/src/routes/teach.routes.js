"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createTeachRelation,
  deleteTeachRelation,
  getSubjectsByTeacher,
  getTeachRelation,
  getTeachesRelation,
  updateTeachRelation,
} from "../controllers/teach.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .post("/", authorizeRoles("administrador", "director"), createTeachRelation)
  .get("/", authorizeRoles("administrador", "director"), getTeachesRelation)
  .get("/detail/", authorizeRoles("administrador", "director"), getTeachRelation)
  .get("/teacher/detail/", authorizeRoles("administrador", "director", "jefe de utp", "docente"), getSubjectsByTeacher)
  .patch("/detail/", authorizeRoles("administrador", "director"), updateTeachRelation)
  .delete("/detail/", authorizeRoles("administrador", "director"), deleteTeachRelation);

export default router;