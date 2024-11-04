"use strict";
import Classroom from "../entity/classroom.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createClassroomService(dataClassroom) {
  try {
      console.log(dataClassroom);
      const classroomRepository = AppDataSource.getRepository(Classroom);

      const { nombre } = dataClassroom;

      const createErrorMessage = (dataInfo, message) => ({
        dataInfo,
        message
      });

      const existingNombreClassroom = await classroomRepository.findOne({
        where: {
          nombre,
        },
      });
      
      if (existingNombreClassroom) return [null, createErrorMessage("nombre", "Nombre en uso")];

      const newClassroom = classroomRepository.create({
          nombre: dataClassroom.nombre,
          estado: dataClassroom.estado,
      });

      const classroomSaved = await classroomRepository.save(newClassroom);

      return [classroomSaved, null];
  } catch (error) {
    console.error("Error al registrar un aula", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getClassroomService(query) {
  try {
    const { id, nombre } = query;

    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroomFound = await classroomRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!classroomFound) return [null, "Aula no encontrada"];

    console.log(classroomFound);
    
    return [classroomFound, null];
  } catch (error) {
    console.error("Error obtener el aula:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getClassroomsService() {
  try {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classrooms = await classroomRepository.find();

    if (!classrooms || classrooms.length === 0) return [null, "No hay aulas"];

    return [classrooms, null];
  } catch (error) {
    console.error("Error al obtener a las aulas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateClassroomService(query, body) {
  try {
    const { id, nombre } = query;

    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroomFound = await classroomRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!classroomFound) return [null, "Aula no encontrada"];

    const existingClassroom = await classroomRepository.findOne({
      where: [ { nombre: body.nombre }],
    });

    if (existingClassroom && existingClassroom.id !== classroomFound.id) {
      return [null, "Ya existe un aula con el mismo nombre"];
    }

    const dataClassroomUpdate = {
      nombre: body.nombre,
      estado: body.estado,
      updatedAt: new Date(),
    };

    await classroomRepository.update({ id: classroomFound.id }, dataClassroomUpdate);

    const classroomData = await classroomRepository.findOne({
      where: { id: classroomFound.id },
    });

    if (!classroomData) {
      return [null, "Aula no encontrado después de actualizar"];
    }

    return [classroomData, null];
  } catch (error) {
    console.error("Error al modificar un aula:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteClassroomService(query) {
  try {
    const { id, nombre } = query;

    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroomFound = await classroomRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!classroomFound) return [null, "Aula no encontrado"];

    const classroomDeleted = await classroomRepository.remove(classroomFound);

    return [classroomDeleted, null];
  } catch (error) {
    console.error("Error al eliminar un aula:", error);
    return [null, "Error interno del servidor"];
  }
}