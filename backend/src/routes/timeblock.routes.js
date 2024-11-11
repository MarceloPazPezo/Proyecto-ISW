"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
    createTimeBlock,
    deleteTimeBlock,
    getTimeBlock,
    getTimeBlocks,
    updateTimeBlock,
} from "../controllers/timeblock.controller.js";

const router = Router();

router.use(authenticateJwt);

router
    .post("/timeBlock", authorizeRoles("administrador", "jefe de utp"), createTimeBlock)
    .get("/", authorizeRoles("administrador", "jefe de utp"), getTimeBlocks)
    .get("/detail/", authorizeRoles("administrador", "jefe de utp"), getTimeBlock)
    .patch("/detail/", authorizeRoles("administrador", "jefe de utp"), updateTimeBlock)
    .delete("/detail/", authorizeRoles("administrador"), deleteTimeBlock);
export default router;