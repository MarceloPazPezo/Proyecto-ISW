"use strict";
import {
    createTimeBlockService,
    deleteTimeBlockService,
    getTimeBlockService,
    getTimeBlocksService,
    updateTimeBlockService
} from "../services/timeblock.service.js";
import {
    timeBlockBodyValidation,
    timeBlockQueryValidation,
} from "../validations/timeblock.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createTimeBlock(req, res) {
    try {
        const timeBlock = req.body;
        const { value, error } = timeBlockBodyValidation.validate(timeBlock);
        if (error)
            return handleErrorClient(res, 400, "Error de validación", error.message);

        const timeBlockSaved = await createTimeBlockService(value);

        handleSuccess(res, 201, "Bloque de tiempo agregado exitosamente", timeBlockSaved);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateTimeBlock(req, res) {
    try {
        const { id, idTeacher, idCourse, idSubject } = req.query;
        const { body } = req;

        const { error: queryError } = timeBlockQueryValidation.validate({
            id,
            idTeacher,
            idCourse,
            idSubject,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const { error: bodyError } = timeBlockBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );

        const [timeBlockUpdate, timeBlockError] = await updateTimeBlockService({
            id, idTeacher, idCourse,
            idSubject
        }, body);

        if (timeBlockError) return handleErrorClient(res, 400, "Error al modificar el bloque de tiempo",
            timeBlockError);

        handleSuccess(res, 200, "Bloque de tiempo modificado correctamente", timeBlockUpdate);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteTimeBlock(req, res) {
    try {
        const { id, idTeacher, idCourse, idSubject } = req.query;

        const { error: queryError } = timeBlockQueryValidation.validate({
            id,
            idTeacher,
            idCourse,
            idSubject,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const [timeBlockDeleted, timeBlockError] = await deleteTimeBlockService({
            id, idTeacher, idCourse,
            idSubject
        }, body);

        if (errorUserDelete) return handleErrorClient(res, 404, "Error eliminado al eliminar el bloque de tiempo",
            timeBlockError);

        handleSuccess(res, 200, "Usuario eliminado correctamente", timeBlockDeleted);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getTimeBlock(req, res) {
    try {
        const { idTeacher, idCourse, idSubject } = req.query;

        const { error: queryError } = timeBlockQueryValidation.validate({
            id,
            idTeacher,
            idCourse,
            idSubject,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const [timeBlock, timeBlockError] = await getTimeBlockService({ id });

        if (timeBlockError) return handleErrorClient(res, 404, timeBlockError);

        handleSuccess(res, 200, "Bloque de tiempo encontrado", timeBlock);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getTimeBlocks(req, res) {
    try {
        const [timeBlocks, timeBlocksError] = await getTimeBlocksService();

        if (timeBlocksError) return handleErrorClient(res, 404, timeBlocksError);

        timeBlocks.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Bloques de tiempo encontrados", timeBlocks);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}





