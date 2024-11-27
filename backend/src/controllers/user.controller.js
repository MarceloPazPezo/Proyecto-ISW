"use strict";
import {
  createTeacherService,
  createUserService,
  deleteUserService,
  getTeachersService,
  getUserRolService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import {
  addValidation,
  userBodyValidation,
  userQueryValidation,
} from "../validations/user.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createUser(req, res) {
  try {
    const user = req.body;
    const { value, error } = addValidation.validate(user);
    if(error)
      return handleErrorClient(res, 400, "Error de validación", error.message);
    
    const [newUser, errorNewUser] = await createUserService(value);
    if (errorNewUser) 
      return handleErrorClient(res, 400, "Error de registro de usuario", errorNewUser);

    handleSuccess(res, 201, "Usuario agregado exitosamente", newUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUser(req, res) {
  try {
    const { rut, id, email, telefono } = req.query; 

    const { error } = userQueryValidation.validate({ rut, id, email, telefono });

    if (error) return handleErrorClient(res, 400, error.message);

    const [user, errorUser] = await getUserService({ rut, id, email, telefono });

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario encontrado", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();

    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function getTeachers(req, res) {
  try {
    const [teachers, errorTeachers] = await getTeachersService();

    if (errorTeachers) return handleErrorClient(res, 404, errorTeachers);

    teachers.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Docentes encontrados", teachers);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );    
  }
}

export async function updateUser(req, res) {
  try {
    const { rut, id, email, telefono } = req.query; 
    const { body } = req;

    const { error: queryError } = userQueryValidation.validate({
      rut,
      id,
      email,
      telefono,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = userBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [user, userError] = await updateUserService({ rut, id, email, telefono }, body);

    if (userError) return handleErrorClient(res, 400, "Error modificando al usuario", userError);

    handleSuccess(res, 200, "Usuario modificado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { rut, id, email, telefono } = req.query;

    const { error: queryError } = userQueryValidation.validate({
      rut,
      id,
      email,
      telefono,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [userDelete, errorUserDelete] = await deleteUserService({
      rut,
      id,
      email,
      telefono,
    });

    if (errorUserDelete) return handleErrorClient(res, 404, "Error eliminado al usuario", errorUserDelete);

    handleSuccess(res, 200, "Usuario eliminado correctamente", userDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createTeacher(req, res) {
  try {
    const teacher = req.body;
    const { value, error } = addValidation.validate(teacher);
    if(error)
      return handleErrorClient(res, 400, "Error de validación", error.message);
    
    const [newTeacher, errorNewTeacher] = await createTeacherService(value);
    if (errorNewTeacher) 
      return handleErrorClient(res, 400, "Error de registro de docente", errorNewTeacher);

    handleSuccess(res, 201, "Usuario agregado exitosamente", newTeacher);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUserRol(req, res) {
  try {

    const { email } = req.query;

    // console.log(email);

    const { error } = userQueryValidation.validate({ email });

    if (error) return handleErrorClient(res, 400, error.message);

    const [userRol, errorUserRol] = await getUserRolService({ email });

    // console.log("controller->" + userRol);

    if (errorUserRol) return handleErrorClient(res, 404, errorUserRol);

    handleSuccess(res, 200, "Rol de usuario encontrado", userRol);

  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}