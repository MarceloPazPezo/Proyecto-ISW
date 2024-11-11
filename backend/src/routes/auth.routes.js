"use strict";
import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";

const router = Router();

router
  .post("/login", login)
  .post("/logout", logout);

export default router;