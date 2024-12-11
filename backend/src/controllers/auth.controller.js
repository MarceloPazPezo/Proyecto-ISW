"use strict";
import { loginService } from "../services/auth.service.js";
import {
  authValidation,
} from "../validations/auth.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function login(req, res) {
  try {
    const { body } = req;

    const { error } = authValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }
    const [accessToken, errorToken] = await loginService(body);

    if (errorToken) return handleErrorClient(res, 400, "Error iniciando sesión", errorToken);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    handleSuccess(res, 200, "Inicio de sesión exitoso", { token: accessToken });
    // console.log("Token: ", accessToken);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    handleSuccess(res, 200, "Sesión cerrada exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}