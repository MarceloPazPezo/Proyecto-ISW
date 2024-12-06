"use strict";
import Teach from "../entity/teach.entity.js";
import User from "../entity/user.entity.js";
import Subject from "../entity/subject.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createTeachService(dataTeach) {
  try {
    const teacherRepository = AppDataSource.getRepository(User);
    const subjectRepository = AppDataSource.getRepository(Subject);
    const teachRepository = AppDataSource.getRepository(Teach);

    const { idTeacher, idSubject, year } = dataTeach;

    const existingTeacher = await teacherRepository.findOne({
      where: { id: idTeacher, rol: "docente" },
    });
    if (!existingTeacher)
      return [null, "El docente no existe"];

    const existingSubject = await subjectRepository.findOne({
      where: { id: idSubject },
    });
    if (!existingSubject)
      return [null, "La asignatura no existe"];

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message
    });

    const existingTeach = await teachRepository.findOne({
      where: {
        idTeacher,
        idSubject,
        year
      },
    });

    if (existingTeach)
      return [null, createErrorMessage("all", "La relación ya existe")];

    const newTeach = teachRepository.create({
      idTeacher: dataTeach.idTeacher,
      idSubject: dataTeach.idSubject,
      year: dataTeach.year,
    });

    const teachSaved = await teachRepository.save(newTeach);

    return [teachSaved, null];
  } catch (error) {
    console.error("Error al registrar la relación", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getTeachService(query) {
  try {
    const { id } = query;

    const teachRepository = AppDataSource.getRepository(Teach);

    const teachFound = await teachRepository.findOne({
      where: { id: id }
    });

    if (!teachFound) return [null, "Relación no encontrada"];

    return [teachFound, null];
  } catch (error) {
    console.error("Error al obtener la relación de enseñanza", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getTeachesService() {
  try {
    const teachRepository = AppDataSource.getRepository(Teach);

    const teaches = await teachRepository
      .createQueryBuilder("teach")
      .leftJoinAndSelect("teach.teacher", "teacher")
      .leftJoinAndSelect("teach.subject", "subject")
      .select([
        "teach.id",
        "teach.year",
        "teacher.id",
        "teacher.rut",
        "teacher.nombreCompleto",
        "subject.nombre",
        "subject.departamento"
      ])
      .getMany();

    if (!teaches || teaches.length === 0)
      return [null, "No hay relaciones"];

    return [teaches, null];
  } catch (error) {
    console.error("Error al obtener las relaciones de enseñanza", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateTeachService(query, body) {
  try {
    const { id } = query;

    const teacherRepository = AppDataSource.getRepository(User);
    const subjectRepository = AppDataSource.getRepository(Subject);
    const teachRepository = AppDataSource.getRepository(Teach);

    const teachFound = await teachRepository.findOne({
      where: { id: id },
    });

    if (!teachFound)
      return [null, "Relación no encontrada"];
    
    const existingTeacher = await teacherRepository.findOne({
      where: { id: body.idTeacher, rol: "docente" },
    });
    if (!existingTeacher)
      return [null, "El docente no existe"];

    const existingSubject = await subjectRepository.findOne({
      where: { id: body.idSubject },
    });
    if (!existingSubject)
      return [null, "La asignatura no existe"];

    const dataTeachUpdate = {
      idTeacher: body.idTeacher,
      idSubject: body.idSubject,
      year: body.year,
    };

    await teachRepository.update({ id: teachFound.id }, dataTeachUpdate);

    const teachData = await teachRepository.findOne({
      where: { id: teachFound.id },
    });

    if (!teachData)
      return [null, "Relación no encontrada después de actualizar"];

    return [teachData, null];
  } catch (error) {
    console.error("Error al modificar una relación de enseñanza", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteTeachService(query) {
  try {
    const { id } = query;

    const teachRepository = AppDataSource.getRepository(Teach);

    const teachFound = await teachRepository.findOne({
      where: { id: id },
    });

    if (!teachFound)
      return [null, "Relación no encontrada"];

    const teachDeleted = await teachRepository.remove(teachFound);

    return [teachDeleted, null];
  } catch (error) {
    console.error("Error al eliminar una relación de enseñanza", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getSubjectsByTeacherService(rutTeacher) {  
  try {
    const teachRepository = AppDataSource.getRepository(Teach);
    const teacherRepository = AppDataSource.getRepository(User);
    
    const teacher = await teacherRepository.findOne({
      where: { rut: rutTeacher, rol: "docente" },
    });

    if (!teacher)
      return [null, "El docente no existe"];

    const teaches = await teachRepository
      .createQueryBuilder("teach")
      .leftJoinAndSelect("teach.teacher", "teacher")
      .leftJoinAndSelect("teach.subject", "subject")
      .where("teach.idTeacher = :id", { id: teacher.id })
      .select([
        "teach.id",
        "teach.year",
        "teacher.id",
        "teacher.rut",
        "teacher.nombreCompleto",
        "subject.id",
        "subject.nombre",
      ])
      .where("teacher.rut = :rut", { rut: teacher.rut })
      .getMany();

    return [teaches, null];
  } catch (error) {
    return [null, error.message];
  }
}
