"use strict"; 
import { Router } from "express"
import { authenticateJwt } from "../middlewares/authentication.middleware.js"
import { authorizeRoles } from "../middlewares/authorization.middleware.js"
import {
    createReservation,
    deleteReservation,
    getReservation,
    getReservations,
    updateReservation
} from "../controllers/reservation.controller.js"

const router = Router();

router.use(authenticateJwt);

router
    .get("/", authorizeRoles("administrador", "encargado", "docente"), getReservations)
    .get("/detail/", authorizeRoles("administrador", "encargado", "docente"), getReservation)
    .post("/detail", authorizeRoles("administrador", "encargado" , "docente"), createReservation)
    .put("/detail/", authorizeRoles("administrador", "encargado"), updateReservation)
    .delete("/detail", authorizeRoles("administrador", "encargado"), deleteReservation);
export default router;