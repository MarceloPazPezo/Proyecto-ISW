"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import classroomRoutes from "./classroom.routes.js";
import subjectRoutes from "./subject.routes.js";
import teachRoutes from "./teach.routes.js";
import userRoutes from "./user.routes.js";
import resourceRoutes from "./resource.routes.js";
import reservationRoutes from "./reservation.routes.js";
import timeBlockRoutes from "./timeblock.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/classroom", classroomRoutes)
    .use("/resource", resourceRoutes)
    .use("/reservation", reservationRoutes)
    .use("/timeblock", timeBlockRoutes)
    .use("/teach", teachRoutes)
    .use("/subject", subjectRoutes)
    .use("/user", userRoutes);

export default router;