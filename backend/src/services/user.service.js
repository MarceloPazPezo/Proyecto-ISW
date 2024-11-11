"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getUserService(query) {
  try {
    const { rut, id, email, telefono } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }, { telefono: telefono }], 
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(query, body) {
  try {
    const { id, rut, email, telefono } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }, { telefono: telefono }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const existingUser = await userRepository.findOne({
      where: [{ rut: body.rut }, { email: body.email }, { telefono: body.telefono }],
    });

    if (existingUser && existingUser.id !== userFound.id) {
      return [null, "Ya existe un usuario con el mismo rut o email o teléfono"];
    }

    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        userFound.password,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    const dataUserUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      telefono: body.telefono,
      rol: body.rol,
      estado: body.estado,
      updatedAt: new Date(),
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      dataUserUpdate.password = await encryptPassword(body.newPassword);
    }

    await userRepository.update({ id: userFound.id }, dataUserUpdate);

    const userData = await userRepository.findOne({
      where: { id: userFound.id },
    });

    if (!userData) {
      return [null, "Usuario no encontrado después de actualizar"];
    }

    const { password, ...userUpdated } = userData;

    return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(query) {
  try {
    const { id, rut, email, telefono } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }, { telefono: telefono }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    if (userFound.rol === "administrador") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const userDeleted = await userRepository.remove(userFound);

    const { password, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createTeacherService(dataUser) {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { rut, email, telefono } = dataUser;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message
    });

    const existingEmailUser = await userRepository.findOne({
      where: {
        email,
      },
    });
    
    if (existingEmailUser) return [null, createErrorMessage("email", "Correo electrónico en uso")];

    const existingRutUser = await userRepository.findOne({
      where: {
        rut,
      },
    });

    if (existingRutUser) return [null, createErrorMessage("rut", "Rut ya asociado a una cuenta")];

    const existingTelefonoUser = await userRepository.findOne({
      where: {
        telefono,
      },
    });

    if (existingTelefonoUser) return [null, createErrorMessage("telefono", "Telefono ya asociado a una cuenta")];

    const newUser = userRepository.create({
      nombreCompleto: dataUser.nombreCompleto,
      email: dataUser.email,
      rut: dataUser.rut,
      password: await encryptPassword(dataUser.password),
      telefono: dataUser.telefono,
      rol: "docente",
      estado: "regular"
    });

    const userSaved = await userRepository.save(newUser);

    return [userSaved, null];
  } catch (error) {
    console.error("Error al registrar al docente", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getTeachersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const teachers = await userRepository.find({
      where: { rol: "docente" },
    });

    if (!teachers || teachers.length === 0) return [null, "No hay docentes"];

    const teachersData = teachers.map(({ password, ...teacher }) => teacher);

    return [teachersData, null];
  } catch (error) {
    console.error("Error al obtener a los docentes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUserRolService(query) {
  try {

    const { email } = query;

    const userRepository = AppDataSource.getRepository(User);

    // console.log(email);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) return [null, "Usuario no encontrado"];

    // console.log(user.rol);

    const aEnviar = {
      rol: user.rol,
      id: user.id
    }

    return [aEnviar, null];
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return [null, "Error interno del servidor"];
  }
}