"use strict";
import {
  createTeachService,
  deleteTeachService,
  getSubjectsByTeacherService,
  getTeachesService,
  getTeachService,
  updateTeachService,
} from "../services/teach.service.js";
import {
  userQueryValidation,
} from "../validations/user.validation.js";
import {
  teachBodyValidation,
  teachQueryValidation,
} from "../validations/teach.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

/**
 * La función `createTeachRelation` maneja la creación de una relación entre `Teacher` <--> `Subject` y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene la información de Teach.
 *  @param {Object} req.body - El objeto que contiene los datos de Teach.
 *  @param {number} req.body.idTeacher - El ID del profesor.
 *  @param {number} req.body.idSubject - El ID de la materia.
 *  @param {number} req.body.year - El año de la relación.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 *  @param {number} res.status - El código de estado HTTP.
 *  @param {string} res.message - El mensaje de estado.
 *  @param {Object} res.body - El cuerpo de la respuesta.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 201: Relación creada con éxito.
 * - 400: Error de validación.
 * - 500: Error del servidor.
 */
export async function createTeachRelation(req, res) {
  try {
    const teach = req.body;

    const { value, error } = teachBodyValidation.validate(teach);

    if (error)
      return handleErrorClient(
        res,
        400,
        "Error de validación",
        error.message
      );

    const [newTeach, errorNewTeach] = await createTeachService(value);

    if (errorNewTeach)
      return handleErrorClient(
        res,
        400,
        "Error registrando la relación",
        errorNewTeach
      );

    handleSuccess(res, 201, "Relación registrada con éxito", newTeach);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

/**
 * La función `getTeachRelation` maneja la solicitud para obtener la información sobre una relación en especifico
 * basado en los parámetros de consulta proporcionados y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id`.
 *  @param {Object} req.query - El objeto que contiene los parámetros de consulta `id`.
 *   @param {string} req.query.id - El ID de Teach.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Relación encontrada.
 * - 400: Error de validación.
 * - 404: Relación no encontrada.
 * - 500: Error del servidor.
 */
export async function getTeachRelation(req, res) {
  try {
    const { id } = req.query;

    const { error } = teachQueryValidation.validate({ id });

    if (error)
      return handleErrorClient(
        res,
        400,
        error.message
      );

    const [teach, errorTeach] = await getTeachService({ id });

    if (errorTeach)
      return handleErrorClient(
        res,
        404,
        errorTeach
      );

    handleSuccess(res, 200, "Relación encontrada", teach);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

/**
 * La función `getTeachesRelation` maneja la solicitud para obtener la lista de las relaciones de Teacher <--> Subject
 * y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Relaciones encontradas.
 * - 204: No hay relaciones.
 * - 404: Relaciones no encontradas.
 * - 500: Error del servidor.
 */
export async function getTeachesRelation(req, res) {
  try {
    const [teaches, errorTeaches] = await getTeachesService();

    if (errorTeaches)
      return handleErrorClient(
        res,
        404,
        errorTeaches
      );

    teaches.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Relaciones encontradas", teaches);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

/**
 * La función `updateTeachRelation` maneja la solicitud para actualizar la información de una relación
 * basado en los parámetros de consulta y el cuerpo de la solicitud proporcionados, y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id`, y el cuerpo de la solicitud `body`.
 *  @param {Object} req.query - El objeto que contiene los parámetros de consulta `id`. 
 *  @param {string} req.query.id - El ID de la relación.
 *   @param {Object} req.body - El objeto que contiene los nuevos datos de la relación.
 *     @param {string} [req.body.estado] - El nuevo estado de la relación (opcional).
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Relación modificada correctamente.
 * - 400: Error de validación.
 * - 500: Error del servidor.
 */
export async function updateTeachRelation(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = teachQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = teachBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [teach, teachError] = await updateTeachService({ id }, body);

    if (teachError)
      return handleErrorClient(
        res,
        400,
        "Error modificando la relación",
        teachError
      );

    handleSuccess(res, 200, "Relación modificada correctamente", teach);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

/**
 * La función `deleteTeachRelation` maneja la solicitud para eliminar una relación
 * basado en los parámetros de consulta proporcionados y responde con el estado de la operación.
 * 
 * @param {Object} req - El objeto de solicitud que contiene los parámetros de consulta `id`.
 *  @param {Object} req.query - El objeto que contiene los parámetros de consulta `id`.
 *   @param {string} req.query.id - El ID de Teach.
 * @param {Object} res - El objeto de respuesta que se enviará al cliente.
 * 
 * @returns {void}
 * 
 * La función puede devolver las siguientes respuestas:
 * - 200: Relación eliminada correctamente.
 * - 400: Error de validación.
 * - 404: Relación no encontrada.
 * - 500: Error del servidor.
 */
export async function deleteTeachRelation(req, res) {
  try {
    const { id } = req.query;

    const { error: queryError } = teachQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [teachDelete, errorTeachDelete] = await deleteTeachService({ id });

    if (errorTeachDelete)
      return handleErrorClient(
        res,
        404,
        "Error eliminando la relación",
        errorTeachDelete
      );

    handleSuccess(res, 200, "Relación eliminada correctamente", teachDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getSubjectsByTeacher(req, res) {
  try {
    const { rut } = req.query;
    console.log(rut);
    const { error } = userQueryValidation.validate({ rut });

    if (error)
      return handleErrorClient(
        res,
        400,
        error.message
      );

    const [subjects, errorSubjects] = await getSubjectsByTeacherService(rut);

    if (errorSubjects)
      return handleErrorClient(
        res,
        404,
        errorSubjects
      );

    handleSuccess(res, 200, "Asignaturas encontradas", subjects);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
