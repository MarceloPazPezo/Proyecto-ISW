"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createTeacher,
  deleteUser,
  getTeachers,
  getUser,
  getUserRol,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/", authorizeRoles("administrador"), getUsers)
  .get("/detail/", authorizeRoles("administrador"), getUser)
  .patch("/detail/", authorizeRoles("administrador"), updateUser)
  .delete("/detail/", authorizeRoles("administrador"), deleteUser)
  .post("/teacher", authorizeRoles("administrador", "jefe de utp"), createTeacher)
  .get("/teacher", authorizeRoles("administrador", "jefe de utp"), getTeachers)
  .get("/rol/" , getUserRol);
export default router;