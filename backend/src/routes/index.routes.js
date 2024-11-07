"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import subjectRoutes from "./subject.routes.js";
import classroomRoutes from "./classroom.routes.js";
import resourceRoutes from "./resource.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/classroom", classroomRoutes)
    .use("/subject", subjectRoutes)
    .use("/resource", resourceRoutes);
export default router;