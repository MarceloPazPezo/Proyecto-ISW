"use strict";
import Classroom from "../entity/classroom.entity.js";
import { AppDataSource } from "../config/configDb.js";

/**
 * La función `createClassroomService` maneja la creación de un aula de clase en la base de datos.
 * 
 * @param {Object} dataClassroom - El objeto que contiene los datos del aula a crear.
 *   @param {string} dataClassroom.nombre - El nombre del aula.
 *   @param {string} [dataClassroom.estado] - El estado del aula (opcional).
 * 
 * @returns {Promise<Array>} Una promesa que puede devolver los siguientes resultados:
 * - [classroomSaved, null]: Aula creada con éxito.
 * - [null, { dataInfo: "nombre", message: "Nombre en uso" }]: El nombre del aula ya está en uso.
 * - [null, "Error interno del servidor"]: Ocurrió un error durante la creación del aula en la base de datos.
 */
export async function createClassroomService(dataClassroom) {
  try {
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

/**
 * La función `getClassroomService` realiza la búsqueda de un aula en la base de datos
 * basado en los parámetros de consulta proporcionados.
 * 
 * @param {Object} query - El objeto de consulta que contiene los parámetros `id` y `nombre`.
 *   @param {string} query.id - El ID del aula.
 *   @param {string} query.nombre - El nombre del aula.
 * 
 * @returns {Promise<Array>} Una promesa que puede devolver los siguientes resultados:
 * - [classroomFound, null]: Aula encontrada con éxito.
 * - [null, "Aula no encontrada"]: No se encontró el aula con el ID o nombre proporcionado.
 * - [null, "Error interno del servidor"]: Ocurrió un error durante la búsqueda en la base de datos.
 */
export async function getClassroomService(query) {
  try {
    const { id, nombre } = query;

    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroomFound = await classroomRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!classroomFound) return [null, "Aula no encontrada"];
    
    return [classroomFound, null];
  } catch (error) {
    console.error("Error obtener el aula:", error);
    return [null, "Error interno del servidor"];
  }
}

/**
 * La función `getClassroomsService` realiza la búsqueda de todas las aulas en la base de datos.
 * 
 * @returns {Promise<Array>} Una promesa que puede devolver los siguientes resultados:
 * - [classrooms, null]: Aulas encontradas con éxito.
 * - [null, "No hay aulas"]: No se encontraron aulas.
 * - [null, "Error interno del servidor"]: Ocurrió un error durante la búsqueda en la base de datos.
 */
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

/**
 * La función `updateClassroomService` maneja la actualización de un aula de clase en la base de datos.
 * 
 * @param {Object} query - El objeto de consulta que contiene los parámetros `id` y `nombre`.
 *   @param {string} query.id - El ID del aula.
 *   @param {string} query.nombre - El nombre del aula.
 * @param {Object} body - El objeto que contiene los nuevos datos del aula.
 *   @param {string} body.nombre - El nuevo nombre del aula.
 *   @param {string} [body.estado] - El nuevo estado del aula (opcional).
 * 
 * @returns {Promise<Array>} Una promesa que puede devolver los siguientes resultados:
 * - [classroomData, null]: Aula actualizada con éxito.
 * - [null, "Aula no encontrada"]: No se encontró el aula con el ID o nombre proporcionado.
 * - [null, "Ya existe un aula con el mismo nombre"]: El nombre del aula ya está en uso por otra aula.
 * - [null, "Aula no encontrada después de actualizar"]: No se encontró el aula después de la actualización.
 * - [null, "Error interno del servidor"]: Ocurrió un error durante la actualización del aula en la base de datos.
 */
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

/**
 * La función `deleteClassroomService` maneja la eliminación de un aula de clase en la base de datos
 * basado en los parámetros de consulta proporcionados.
 * 
 * @param {Object} query - El objeto de consulta que contiene los parámetros `id` y `nombre`.
 *   @param {string} query.id - El ID del aula.
 *   @param {string} query.nombre - El nombre del aula.
 * 
 * @returns {Promise<Array>} Una promesa que puede devolver los siguientes resultados:
 * - [classroomDeleted, null]: Aula eliminada con éxito.
 * - [null, "Aula no encontrada"]: No se encontró el aula con el ID o nombre proporcionado.
 * - [null, "Error interno del servidor"]: Ocurrió un error durante la eliminación del aula en la base de datos.
 */
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