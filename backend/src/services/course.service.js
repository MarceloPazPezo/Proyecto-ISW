"use strict";
import User from "../entity/user.entity.js";
import Classroom from "../entity/classroom.entity.js";
import Course from "../entity/course.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getCourseService(query) {
  try {
    const { id, nombre, idBossTeacher, idClassroom} = query;

    const courseRepository = AppDataSource.getRepository(Course);

    const courseFound = await courseRepository.findOne({
      where: [{ id: id }, { nombre: nombre }, { idClassroom: idClassroom }, { idBossTeacher: idBossTeacher }]
    });

    if (!courseFound) return [null, "Curso no encontrado"];

    return [courseFound, null];
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getCoursesService() {
  try {
    const courseRepository = AppDataSource.getRepository(Course);

    const coursesFound = await courseRepository.find();

    if (!coursesFound || coursesFound.length === 0) return [null, "No hay cursos"];

    return [coursesFound, null];
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateCourseService(query, body) {
  try {
    //Datos que son unicos(indices)
    const { id, nombre, idBossTeacher, idClassroom} = query;

    const courseRepository = AppDataSource.getRepository(Course);
    const userRepository = AppDataSource.getRepository(User);
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const courseFound = await courseRepository.findOne({
      where: [{ id: id }, { nombre: nombre }, { idClassroom: idClassroom }, { idBossTeacher: idBossTeacher }],
    });

    if (!courseFound) return [null, "Curso no encontrado"];

    const existingCourse = await courseRepository.findOne({
      where: [{ nombre: body.nombre }, { idClassroom: body.idClassroom }, { idBossTeacher: body.idBossTeacher }],
    });

    if (existingCourse && existingCourse.id !== courseFound.id) {
      return [null, "Ya existe un curso con mismo nombre"];
    }

    //Verificar que no se repiten estos datos
    const existingNombreCourse = await courseRepository.findOne({
      where: {
      nombre,
      },
    });
    if (existingNombreCourse) return [null, createErrorMessage("nombre", "Nombre en uso")];

    const existingIdBossTeacherCourse = await courseRepository.findOne({
      where: {
      idBossTeacher,
      },
    });
      
    if (existingIdBossTeacherCourse) return [null, createErrorMessage("idBossTeacher", "Docente en uso")];

    const existingIdClassroomCourse = await courseRepository.findOne({
      where: {
        idClassroom,
      },
    });
    
    if (existingIdClassroomCourse) return [null, createErrorMessage("idClassroom", "Sala en uso")];

    //Verificación de existencia de datos
    const existingIdTeacher = await userRepository.findOne({
      where: {
        id: idBossTeacher,
        rol: "docente",
      },
    });
    
    if (!existingIdTeacher) return [null, createErrorMessage("idBossTeacher", "El docente no existe")];

    const existingIdClassroom = await classroomRepository.findOne({
      where: {
        id: idClassroom,
      },
    });
    
    if (!existingIdClassroom) return [null, createErrorMessage("idClassroom", "La sala no existe")];

    //Datos que se pueden modificar
    const dataCourseUpdate = {
      nombre: body.nombre,
      idBossTeacher: body.idBossTeacher,
      idClassroom: body.idClassroom,
      cantidadAlumnos: body.cantidadAlumnos,
      updatedAt: new Date(),
    };
    await courseRepository.update({ id: courseFound.id }, dataCourseUpdate);

    const courseData = await courseRepository.findOne({
      where: { id: courseFound.id },
    });

    if (!courseData) {
      return [null, "Curso no encontrado después de actualizar"];
    }

    return [courseData, null];
  } catch (error) {
    console.error("Error al modificar un curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteCourseService(query) {
  try {
    const { id, nombre, idBossTeacher, idClassroom} = query;

    const courseRepository = AppDataSource.getRepository(Course);

    const courseFound = await courseRepository.findOne({
      where: [{ id: id }, { nombre: nombre }, { idClassroom: idClassroom }, { idBossTeacher: idBossTeacher }],
    });

    if (!courseFound) return [null, "Curso no encontrado"];

    const courseDeleted = await courseRepository.remove(courseFound);

    return [courseDeleted, null];
  } catch (error) {
    console.error("Error al eliminar un curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createCourseService(dataCourse) {
  try {
    
      const courseRepository = AppDataSource.getRepository(Course);
      const userRepository = AppDataSource.getRepository(User);
      const classroomRepository = AppDataSource.getRepository(Classroom);

      const { nombre, idBossTeacher, idClassroom } = dataCourse;

      const createErrorMessage = (dataInfo, message) => ({
        dataInfo,
        message
      });

      //Verificar que no se repiten estos datos
      const existingNombreCourse = await courseRepository.findOne({
        where: {
          nombre,
        },
      });
      if (existingNombreCourse) return [null, createErrorMessage("nombre", "Nombre en uso")];

      const existingIdBossTeacherCourse = await courseRepository.findOne({
        where: {
          idBossTeacher,
        },
      });
      
      if (existingIdBossTeacherCourse) return [null, createErrorMessage("idBossTeacher", "Docente en uso")];

      const existingIdClassroomCourse = await courseRepository.findOne({
        where: {
          idClassroom,
        },
      });
      
      if (existingIdClassroomCourse) return [null, createErrorMessage("idClassroom", "Sala en uso")];

      //Verificación de existencia de datos
      const existingIdTeacher = await userRepository.findOne({
        where: {
          id: idBossTeacher,
          rol: "docente",
        },
      });
      
      if (!existingIdTeacher) return [null, createErrorMessage("idBossTeacher", "El docente no existe")];

      const existingIdClassroom = await classroomRepository.findOne({
        where: {
          id: idClassroom,
        },
      });
      
      if (!existingIdClassroom) return [null, createErrorMessage("idClassroom", "La sala no existe")];
      
      const newCourse = courseRepository.create({
          nombre: dataCourse.nombre,
          idBossTeacher: dataCourse.idBossTeacher, 
          idClassroom: dataCourse.idClassroom,
          cantidadAlumnos: dataCourse.cantidadAlumnos,
      });

      const courseSaved = await courseRepository.save(newCourse);

      return [courseSaved, null];
  } catch (error) {
    console.error("Error al registrar el curso", error);
    return [null, "Error interno del servidor"];
  }
}

