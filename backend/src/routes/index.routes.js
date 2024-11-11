"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import subjectRoutes from "./subject.routes.js";
import classroomRoutes from "./classroom.routes.js";
import resourceRoutes from "./resource.routes.js";
import reservationRoutes from "./reservation.routes.js";
import timeBlockRoutes from "./timeblock.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/classroom", classroomRoutes)
    .use("/resource", resourceRoutes)
    .use("/reservation", reservationRoutes)
    .use("/timeblock", timeBlockRoutes)
    .use("/subject", subjectRoutes);

export default router;