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

/**
 * La función `createClassroom` maneja la creación de un aula de clase y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene la información del aula.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 201: Aula creada con éxito. El cuerpo de la respuesta contendrá los detalles del aula creada.
 * - 400: Error de validación. El cuerpo de la respuesta contendrá detalles del error.
 * - 500: Error del servidor. El cuerpo de la respuesta contendrá el mensaje de error.
 */
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

/**
 * La función `getClassroom` maneja la solicitud para obtener información sobre un aula de clase
 * basado en los parámetros de consulta proporcionados y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id` y `nombre`.
 *   @param {string} req.query.id - El ID del aula.
 *   @param {string} req.query.nombre - El nombre del aula.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Aula encontrada. El cuerpo de la respuesta contendrá los detalles del aula.
 * - 400: Error de validación. El cuerpo de la respuesta contendrá detalles del error de validación.
 * - 404: Aula no encontrada. El cuerpo de la respuesta contendrá un mensaje indicando que no se encontró el aula.
 * - 500: Error del servidor. El cuerpo de la respuesta contendrá un mensaje descriptivo del error.
 */
export async function getClassroom(req, res) {
  try {
    const { id, nombre } = req.query; // Aquí debería ser body, o no funciona.

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

/**
 * La función `getClassrooms` maneja la solicitud para obtener la lista de aulas de clase
 * y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Aulas encontradas. El cuerpo de la respuesta contendrá los detalles de las aulas.
 * - 204: No hay aulas. La respuesta no contendrá contenido.
 * - 404: Aulas no encontradas. El cuerpo de la respuesta contendrá un mensaje indicando que no se encontraron aulas.
 * - 500: Error del servidor. El cuerpo de la respuesta contendrá un mensaje descriptivo del error.
 */
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

/**
 * La función `updateClassroom` maneja la solicitud para actualizar la información de un aula de clase
 * basado en los parámetros de consulta y el cuerpo de la solicitud proporcionados, y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id` y `nombre`, y el cuerpo de la solicitud `body`.
 *   @param {string} req.query.id - El ID del aula.
 *   @param {string} req.query.nombre - El nombre del aula.
 *   @param {Object} req.body - El objeto que contiene los nuevos datos del aula.
 *     @param {string} req.body.nombre - El nuevo nombre del aula.
 *     @param {string} [req.body.estado] - El nuevo estado del aula (opcional).
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Aula modificada correctamente. El cuerpo de la respuesta contendrá los detalles del aula actualizada.
 * - 400: Error de validación. El cuerpo de la respuesta contendrá detalles del error de validación en la consulta o los datos enviados.
 * - 500: Error del servidor. El cuerpo de la respuesta contendrá un mensaje descriptivo del error.
 */
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

/**
 * La función `deleteClassroom` maneja la solicitud para eliminar un aula de clase
 * basado en los parámetros de consulta proporcionados y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id` y `nombre`.
 *   @param {string} req.query.id - El ID del aula.
 *   @param {string} req.query.nombre - El nombre del aula.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Aula eliminada correctamente. El cuerpo de la respuesta contendrá los detalles del aula eliminada.
 * - 400: Error de validación. El cuerpo de la respuesta contendrá detalles del error de validación en la consulta.
 * - 404: Aula no encontrada. El cuerpo de la respuesta contendrá un mensaje indicando que no se encontró el aula.
 * - 500: Error del servidor. El cuerpo de la respuesta contendrá un mensaje descriptivo del error.
 */
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