"use strict";
import TimeBlock from "../entity/timeblock.entity.js";
import User from "../entity/user.entity.js";
import Course from "../entity/course.entity.js";
import Subject from "../entity/subject.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createTimeBlockService(body) {
    try {

        const createErrorMessage = (dataInfo, message) => ({
            dataInfo,
            message
        });

        const userRepository = AppDataSource.getRepository(User);

        const courseRepository = AppDataSource.getRepository(Course);

        const subjectRepository = AppDataSource.getRepository(Subject);

        const teacherFound = await userRepository.findOne({ where: { id: body.idTeacher, rol: "docente" } });

        if (!teacherFound) return [null, createErrorMessage("Profesor no encontrado")];

        const courseFound = await courseRepository.findOne({ where: { id: body.idCourse } });

        if (!courseFound) return [null, createErrorMessage("Curso no encontrado")];

        const subjectFound = await subjectRepository.findOne({ where: { id: body.idSubject } });

        if (!subjectFound) return [null, createErrorMessage("Asignatura no encontrada")];

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = body;

        const existingTimeBlock = await timeBlockRepository.findOne({
            where: {
                idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana
            },
        });

        if (existingTimeBlock) return [null, createErrorMessage("all", "Ya existe el bloque de tiempo")];

        const newTimeBlock = timeBlockRepository.create({
            idTeacher: body.idTeacher,
            idCourse: body.idCourse,
            idSubject: body.idSubject,
            horaInicio: body.horaInicio,
            horaTermino: body.horaTermino,
            diaSemana: body.diaSemana
        });

        const timeBlockSaved = await timeBlockRepository.save(newTimeBlock);

        return [timeBlockSaved, null];
    } catch (error) {
        console.error("Error al crear bloque de tiempo", error);
        return [null, "Error interno del servidor"];
    }
}


export async function updateTimeBlockService(query, body) {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlockFound = await timeBlockRepository.findOne({
            where: { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana },
        });

        if (!timeBlockFound) return [null, "Bloque de tiempo no encontrado"];

        const updatedTimeBlockData = {
            idTeacher: body.idTeacher,
            idCourse: body.idCourse,
            idSubject: body.idSubject,
            horaInicio: body.horaInicio,
            horaTermino: body.horaTermino,
            diaSemana: body.diaSemana
        };

        const timeBlockUpdatedFound = await timeBlockRepository.findOne({
            where: updatedTimeBlockData,
        });

        if (timeBlockUpdatedFound) return [null, "Ya existe un bloque de tiempo con los mismos datos"];

        await timeBlockRepository.update({ id: timeBlockFound.id }, updatedTimeBlockData);

        // se busca el timeBlock actualizado
        const timeBlockData = await timeBlockRepository.findOne({
            where: { id: timeBlockFound.id },
        });

        if (!timeBlockData) {
            return [null, "Tiempo de bloque no encontrado después de actualizar"];
        }

        return [timeBlockData, null];
    } catch (error) {
        console.error("Error al modificar un usuario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteTimeBlockService(query) {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlockFound = await timeBlockRepository.findOne({
            where: { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana },
        });

        if (!timeBlockFound) return [null, "Bloque de tiempo no encontrado"];

        const timeBlockDeleted = await timeBlockRepository.remove(timeBlockFound);

        // se busca el timeBlock eliminado
        const timeBlockData = await timeBlockRepository.findOne({
            where: { id: timeBlockDeleted.id },
        });

        if (timeBlockData) {
            return [null, "Bloque de tiempo encontrado después de eliminar, error al eliminar"];
        }

        return [timeBlockDeleted, null];
    } catch (error) {
        console.error("Error al eliminar el bloque de tiempo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTimeBlockService(query) {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const whereClause = {};
        if (idTeacher) whereClause.idTeacher = idTeacher;
        if (idCourse) whereClause.idCourse = idCourse;
        if (idSubject) whereClause.idSubject = idSubject;
        if (horaInicio) whereClause.horaInicio = horaInicio;
        if (horaTermino) whereClause.horaTermino = horaTermino;
        if (diaSemana) whereClause.diaSemana = diaSemana;

        const timeBlockFound = await timeBlockRepository.findOne({
            where: whereClause
        });

        if (!timeBlockFound) return [null, "Bloque de tiempo no encontrado"];

        return [timeBlockFound, null];
    } catch (error) {
        console.error("Error obtener el usuario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTimeBlocksService() {
    try {
        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlocks = await timeBlockRepository.find();

        if (!timeBlocks || timeBlocks.length === 0) return [null, "No hay bloques de tiempos"];

        return [timeBlocks, null];
    } catch (error) {
        console.error("Error al obtener a los usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}
