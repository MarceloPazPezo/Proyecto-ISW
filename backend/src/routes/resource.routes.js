"use strict";

import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { 
    createResource, 
    deleteResource, 
    getResource, 
    getResources, 
    updateResource 
} 
from "../controllers/resource.controller.js";

const router = Router();

router.use(authenticateJwt);

router
    .get("/", authorizeRoles("administrador", "encargado", "docente"),getResources)
    .get("/resource", authorizeRoles("administrador", "encargado", "docente"),getResource)
    .post("/detail", authorizeRoles("administrador", "encargado"),createResource)
    .put("/detail", authorizeRoles("administrador", "encargado"),updateResource)
    .delete("/detail", authorizeRoles("administrador", "encargado"),deleteResource);
export default router;