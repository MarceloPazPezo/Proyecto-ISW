"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import classroomRoutes from "./classroom.routes.js";
import subjectRoutes from "./subject.routes.js";
import teachRoutes from "./teach.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/classroom", classroomRoutes)
    .use("/teach", teachRoutes)
    .use("/subject", subjectRoutes)
    .use("/user", userRoutes);

export default router;