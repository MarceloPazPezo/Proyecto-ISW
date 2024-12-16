"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/", authorizeRoles("administrador", "jefe de utp"), getCourses)
  .post("/", authorizeRoles("administrador", "director"), createCourse)
  .get("/detail/", authorizeRoles("administrador"), getCourse)
  .patch("/detail/", authorizeRoles("administrador"), updateCourse)
  .delete("/detail/", authorizeRoles("administrador"), deleteCourse)
  
export default router;