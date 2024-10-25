"use strict";
import { Router } from "express";
import { isAdmin, isJefeUTP } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  deleteUser,
  getTeachers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/", isAdmin, getUsers)
  .get("/detail/", isAdmin, getUser)
  .patch("/detail/", isAdmin, updateUser)
  .delete("/detail/", isAdmin, deleteUser)
  .get("/teachers", authorizeRoles("administrador", "jefe de utp"), getTeachers);

export default router;