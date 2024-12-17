"use strict";
import User from "../entity/user.entity.js";
import Classroom from "../entity/classroom.entity.js";
import Course from "../entity/course.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Not } from "typeorm";

export async function getCourseService(query) {
  try {
    const { id, nombre, idBossTeacher, idClassroom } = query;

    const courseRepository = AppDataSource.getRepository(Course);

    const courseFound = await courseRepository.findOne({
      where: [
        { id: id },
        { nombre: nombre },
        { idClassroom: idClassroom },
        { idBossTeacher: idBossTeacher },
      ],
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

    const coursesFound = await courseRepository
      .createQueryBuilder("course")
      .leftJoinAndSelect("course.teacher", "teacher")
      .leftJoinAndSelect("course.classroom", "classroom")
      .select([
        "course.id",
        "course.nombre",
        "course.idBossTeacher",
        "teacher.nombreCompleto",
        "teacher.rut",
        "course.idClassroom",
        "classroom.nombre",
        "course.cantidadAlumnos",
      ])
      .getMany();

    if (!coursesFound || coursesFound.length === 0)
      return [null, "No hay cursos"];

    return [coursesFound, null];
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateCourseService(query, body) {
  try {
    const { id, nombre } = query;
    const courseRepository = AppDataSource.getRepository(Course);
    const userRepository = AppDataSource.getRepository(User);
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message,
    });

    const courseFound = await courseRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!courseFound) return [null, "Curso no encontrado"];

    if (body.nombre && body.nombre !== courseFound.nombre) {
      const existingNombreCourse = await courseRepository
        .createQueryBuilder("course")
        .where("course.nombre = :nombre", { nombre: body.nombre })
        .andWhere("course.id != :id", { id: courseFound.id })
        .getOne();
    
      if (existingNombreCourse) {
        return [null, createErrorMessage("nombre", "Nombre en uso")];
      }
    }
    

    const existingIdBossTeacherCourse = await courseRepository.findOne({
      where: {
        idBossTeacher: body.idBossTeacher,
        id: Not(courseFound.id),
      },
    });

    if (existingIdBossTeacherCourse)
      return [null, createErrorMessage("idBossTeacher", "Docente en uso")];

    const existingIdClassroomCourse = await courseRepository.findOne({
      where: {
        idClassroom: body.idClassroom,
        id: Not(courseFound.id),
      },
    });

    if (existingIdClassroomCourse)
      return [null, createErrorMessage("idClassroom", "Sala en uso")];

    const existingIdTeacher = await userRepository.findOne({
      where: {
        id: body.idBossTeacher,
        rol: "docente",
      },
    });

    if (!existingIdTeacher)
      return [
        null,
        createErrorMessage("idBossTeacher", "El docente no existe"),
      ];

    const existingIdClassroom = await classroomRepository.findOne({
      where: {
        id: body.idClassroom,
      },
    });

    if (!existingIdClassroom)
      return [null, createErrorMessage("idClassroom", "La sala no existe")];

    if (body.idClassroom && body.idClassroom !== courseFound.idClassroom) {
      const previousClassroom = await classroomRepository.findOne({
        where: { id: courseFound.idClassroom },
      });
      if (previousClassroom) {
        previousClassroom.estado = "disponible";
        await classroomRepository.save(previousClassroom);
      }

      const newClassroom = await classroomRepository.findOne({
        where: { id: body.idClassroom },
      });
      if (!newClassroom) {
        return [null, createErrorMessage("idClassroom", "La nueva sala no existe")];
      }
      if (newClassroom.estado === "ocupada") {
        return [null, createErrorMessage("idClassroom", "La nueva sala está ocupada")];
      }

      newClassroom.estado = "ocupada";
      await classroomRepository.save(newClassroom);
    }

    if (existingIdClassroom.capacidad < body.cantidadAlumnos)
      return [
        null,
        createErrorMessage(
          "cantidadAlumnos",
          "La cantidad de alumnos supera la capacidad de la sala",
        ),
      ];

    const dataCourseUpdate = {
      nombre: body.nombre,
      idBossTeacher: body.idBossTeacher,
      idClassroom: body.idClassroom,
      cantidadAlumnos: body.cantidadAlumnos,
      updatedAt: new Date(),
    };
    await courseRepository.update({ id: courseFound.id }, dataCourseUpdate);

    const courseWithDetails = await courseRepository
      .createQueryBuilder("course")
      .leftJoinAndSelect("course.teacher", "teacher")
      .leftJoinAndSelect("course.classroom", "classroom")
      .select([
        "course.id",
        "course.nombre",
        "course.idBossTeacher",
        "teacher.nombreCompleto",
        "teacher.rut",
        "course.idClassroom",
        "classroom.nombre",
        "course.cantidadAlumnos",
      ])
      .where("course.id = :id", { id: courseFound.id })
      .getOne();
    
    return [courseWithDetails, null];
  } catch (error) {
    console.error("Error al modificar un curso:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteCourseService(query) {
  try {
    const { id, nombre, idBossTeacher, idClassroom } = query;

    const courseRepository = AppDataSource.getRepository(Course);
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const courseFound = await courseRepository.findOne({
      where: [
        { id: id },
        { nombre: nombre },
        { idClassroom: idClassroom },
        { idBossTeacher: idBossTeacher },
      ],
    });

    if (!courseFound) return [null, "Curso no encontrado"];

    const associatedClassroom = await classroomRepository.findOne({
      where: { id: courseFound.idClassroom },
    });

    if (associatedClassroom) {
      associatedClassroom.estado = "disponible";
      await classroomRepository.save(associatedClassroom);
    }

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
      message,
    });

    const existingNombreCourse = await courseRepository.findOne({
      where: {
        nombre,
      },
    });
    if (existingNombreCourse)
      return [null, createErrorMessage("nombre", "Nombre en uso")];

    const existingIdBossTeacherCourse = await courseRepository.findOne({
      where: {
        idBossTeacher,
      },
    });

    if (existingIdBossTeacherCourse)
      return [null, createErrorMessage("idBossTeacher", "Docente en uso")];

    const existingIdClassroomCourse = await courseRepository.findOne({
      where: {
        idClassroom,
      },
    });

    if (existingIdClassroomCourse)
      return [null, createErrorMessage("idClassroom", "Sala en uso")];

    const existingIdTeacher = await userRepository.findOne({
      where: {
        id: idBossTeacher,
        rol: "docente",
      },
    });

    if (!existingIdTeacher)
      return [
        null,
        createErrorMessage("idBossTeacher", "El docente no existe"),
      ];

    const existingIdClassroom = await classroomRepository.findOne({
      where: {
        id: idClassroom,
      },
    });

    if (!existingIdClassroom)
      return [null, createErrorMessage("idClassroom", "La sala no existe")];

    if (existingIdClassroom.capacidad < dataCourse.cantidadAlumnos)
      return [
        null,
        createErrorMessage(
          "cantidadAlumnos",
          "La cantidad de alumnos supera la capacidad de la sala",
        ),
      ];

    const newCourse = courseRepository.create({
      nombre: dataCourse.nombre,
      idBossTeacher: dataCourse.idBossTeacher,
      idClassroom: dataCourse.idClassroom,
      cantidadAlumnos: dataCourse.cantidadAlumnos,
    });

    const courseSaved = await courseRepository.save(newCourse);

    existingIdClassroom.estado = "ocupada";
    await classroomRepository.save(existingIdClassroom);

    const courseWithDetails = await courseRepository
      .createQueryBuilder("course")
      .leftJoinAndSelect("course.teacher", "teacher")
      .leftJoinAndSelect("course.classroom", "classroom")
      .select([
        "course.id",
        "course.nombre",
        "course.idBossTeacher",
        "teacher.nombreCompleto",
        "teacher.rut",
        "course.idClassroom",
        "classroom.nombre",
        "course.cantidadAlumnos",
      ])
      .where("course.id = :id", { id: courseSaved.id })
      .getOne();

    return [courseWithDetails, null];
  } catch (error) {
    console.error("Error al registrar el curso", error);
    return [null, "Error interno del servidor"];
  }
}
