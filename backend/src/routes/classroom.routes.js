"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createClassroom,
  deleteClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
} from "../controllers/classroom.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/", authorizeRoles("administrador", "director"), getClassrooms)
  .post("/", authorizeRoles("administrador", "director"), createClassroom)
  .get("/detail/", authorizeRoles("administrador", "director"), getClassroom)
  .patch("/detail/", authorizeRoles("administrador", "director"), updateClassroom)
  .delete("/detail/", authorizeRoles("administrador", "director"), deleteClassroom)

export default router;