"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import classroomRoutes from "./classroom.routes.js";
import courseRoutes from "./course.routes.js";
const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/classroom", classroomRoutes)
    .use("/course", courseRoutes);

export default router;