"use strict";
import TimeBlock from "../entity/timeblock.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createTimeBlockService(body) {
    try {

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, fecha } = body;

        const createErrorMessage = (dataInfo, message) => ({
            dataInfo,
            message
        });

        const existingTimeBlock = await timeBlockRepository.findOne({
            where: {
                idTeacher, idCourse, idSubject, horaInicio, horaTermino, fecha
            },
        });

        if (existingTimeBlock) return [null, createErrorMessage("all", "Ya existe el bloque de tiempo")];

        const newTimeBlock = timeBlockRepository.create({
            idTeacher: body.idTeacher,
            idCourse: body.idCourse,
            idSubject: body.idSubject,
            horaInicio: body.horaInicio,
            horaTermino: body.horaTermino,
            fecha: body.fecha
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
        const { id, idTeacher, idCourse, idSubject } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlockFound = await timeBlockRepository.findOne({
            where: [{ id: id }, { idTeacher: idTeacher }, { idCourse: idCourse }, { idSubject: idSubject }],
        });

        if (!timeBlockFound) return [null, "TimeBlock no encontrado"];

        const datatimeBlockUpdated = {
            idTeacher: body.idTeacher,
            idCourse: body.idCourse,
            idSubject: body.idSubject,
            horaInicio: body.horaInicio,
            horaTermino: body.horaTermino,
            fecha: body.fecha
        };

        await timeBlockRepository.update({ id: timeBlockFound.id }, datatimeBlockUpdated);

        // se busca el timeBlock actualizado
        const timeBlockData = await timeBlockRepository.findOne({
            where: { id: timeBlockFound.id },
        });

        if (!timeBlockData) {
            return [null, "Tiempo de bloque no encontrado después de actualizar"];
        }

        return [datatimeBlockUpdated, null];
    } catch (error) {
        console.error("Error al modificar un usuario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteTimeBlockService(query) {
    try {
        const { id, idTeacher, idCourse, idSubject } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlockFound = await timeBlockRepository.findOne({
            where: [{ id: id }, { idTeacher: idTeacher }, { idCourse: idCourse }, { idSubject: idSubject }],
        });

        if (!timeBlockFound) return [null, "Bloque de tiempo no encontrado"];

        const timeBlockDeleted = await timeBlockRepository.remove(timeBlockFound);

        // se busca el timeBlock eliminado
        const timeBlockData = await timeBlockRepository.findOne({
            where: { id: timeBlockDeleted.id },
        });

        if (!timeBlockData) {
            return [null, "Tiempo de bloque no encontrado después de eliminar"];
        }

        return [timeBlockDeleted, null];
    } catch (error) {
        console.error("Error al eliminar el bloque de tiempo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTimeBlockService(query) {
    try {
        const { idTeacher, idCourse, idSubject } = query;

        const timeBlockRepository = AppDataSource.getRepository(TimeBlock);

        const timeBlockFound = await timeBlockRepository.findOne({
            where: [{ id: id }, { idTeacher: idTeacher }, { idCourse: idCourse }, { idSubject: idSubject }],
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
