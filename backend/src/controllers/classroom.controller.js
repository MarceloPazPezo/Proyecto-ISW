"use strict";
import {
  createClassroomService,
  deleteClassroomService,
  getClassroomService,
  getClassroomsService,
  updateClassroomService,
} from "../services/classroom.service.js";
import {
  classroomBodyValidation,
  classroomQueryValidation,
} from "../validations/classroom.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createClassroom(req, res) {
  try {
    const classroom = req.body;

    const { value, error } = classroomBodyValidation.validate(classroom);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newClassroom, errorNewClassroom] = await createClassroomService(value);

    if (errorNewClassroom) return handleErrorClient(res, 400, "Error registrando el aula", errorNewClassroom);

    handleSuccess(res, 201, "Aula registrada con éxito", newClassroom);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getClassroom(req, res) {
  try {
    const { id, nombre } = req.query;

    const { error } = classroomQueryValidation.validate({ id, nombre });

    if (error) return handleErrorClient(res, 400, error.message);

    const [classroom, errorClassroom] = await getClassroomService({ id, nombre });

    if (errorClassroom) return handleErrorClient(res, 404, errorClassroom);

    handleSuccess(res, 200, "Aula encontrada", classroom);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message
    );
  }
}

export async function getClassrooms(req, res) {
  try {
    const [classrooms, errorClassrooms] = await getClassroomsService();

    if (errorClassrooms) return handleErrorClient(res, 404, errorClassrooms);

    classrooms.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Aulas encontradas", classrooms);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateClassroom(req, res) {
  try {
    const { id, nombre } = req.query;
    const { body } = req;

    const { error: queryError } = classroomQueryValidation.validate({
      id,
      nombre,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = classroomBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [classroom, classroomError] = await updateClassroomService({ id, nombre }, body);

    if (classroomError) return handleErrorClient(res, 400, "Error modificando el aula", classroomError);

    handleSuccess(res, 200, "Aula modificada correctamente", classroom);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteClassroom(req, res) {
  try {
    const { id, nombre } = req.query;

    const { error: queryError } = classroomQueryValidation.validate({
      id,
      nombre,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [classroomDelete, errorClassroomDelete] = await deleteClassroomService({
      id,
      nombre,
    });

    if (errorClassroomDelete) return handleErrorClient(res, 404, "Error eliminado el aula", errorClassroomDelete);

    handleSuccess(res, 200, "Aula eliminada correctamente", classroomDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}