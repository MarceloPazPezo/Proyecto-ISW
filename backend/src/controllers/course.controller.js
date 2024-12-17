"use strict";
import {
  createCourseService,
  deleteCourseService,
  getCourseService,
  getCoursesService,
  updateCourseService,
} from "../services/course.service.js";
import {
  addValidation,
  courseBodyValidation,
  courseQueryValidation,
} from "../validations/course.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getCourse(req, res) {
  try {
    const { id, nombre, idBossTeacher, idClassroom } = req.query;
    const { error } = courseQueryValidation.validate({
      id,
      nombre,
      idBossTeacher,
      idClassroom,
    });

    if (error) return handleErrorClient(res, 400, error.message);

    const [course, errorCourse] = await getCourseService({
      id,
      nombre,
      idBossTeacher,
      idClassroom,
    });

    if (errorCourse) return handleErrorClient(res, 404, errorCourse);

    handleSuccess(res, 200, "Course encontrado", course);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getCourses(req, res) {
  try {
    const [courses, errorCourses] = await getCoursesService();

    if (errorCourses) return handleErrorClient(res, 404, errorCourses);

    courses.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Cursos  encontrados", courses);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateCourse(req, res) {
  try {
    const { id, nombre, idBossTeacher, idClassroom } = req.query;
    const { body } = req;

    const { error: queryError } = courseQueryValidation.validate({
      nombre,
      id,
      idBossTeacher,
      idClassroom,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = courseBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [course, courseError] = await updateCourseService({ nombre }, body);

    if (courseError)
      return handleErrorClient(
        res,
        400,
        "Error modificando al curso",
        courseError,
      );

    handleSuccess(res, 200, "Curso modificado correctamente", course);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteCourse(req, res) {
  try {
    const { id, nombre, idBossTeacher, idClassroom } = req.query;

    const { error: queryError } = courseQueryValidation.validate({
      id,
      nombre,
      idBossTeacher,
      idClassroom,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [courseDelete, errorCourseDelete] = await deleteCourseService({
      id,
      nombre,
      idBossTeacher,
      idClassroom,
    });

    if (errorCourseDelete)
      return handleErrorClient(
        res,
        404,
        "Error eliminado al curso",
        errorCourseDelete,
      );

    handleSuccess(res, 200, "Curso eliminado correctamente", courseDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createCourse(req, res) {
  try {
    const course = req.body;
    const { value, error } = addValidation.validate(course);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newCourse, errorNewCourse] = await createCourseService(value);

    if (errorNewCourse)
      return handleErrorClient(
        res,
        400,
        "Error de registro de curso",
        errorNewCourse,
      );

    handleSuccess(res, 201, "Curso agregado exitosamente", newCourse);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
