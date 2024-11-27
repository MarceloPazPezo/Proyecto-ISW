"use strict";
import {
    createSubjectService,
    deleteSubjectService,
    getSubjectService,
    getSubjectsService,
    updateSubjectsService,
} from "../services/subject.service.js";
import {
    subjectBodyValidation,
    subjectQueryValidation,
} from "../validations/subject.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getSubject(req, res) {
    try {

        const { id, nombre, departamento } = req.query; 

        const { error } = subjectQueryValidation.validate({ id , nombre, departamento });

        if (error) return handleErrorClient(res, 400, error.message);

        const [subject, errorSubject] = await getSubjectService({ id , nombre , departamento });

        if (errorSubject) return handleErrorClient(res, 404, errorSubject);

        handleSuccess(res, 200, "Asignatura encontrada", subject);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getSubjects(req, res) {
    try {
        
        const [subjects, errorSubjects] = await getSubjectsService();

        if (errorSubjects) return handleErrorClient(res, 404, errorSubjects);

        subjects.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Asignaturas encontradas", subjects);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );        
    }
}

export async function createSubject(req, res) {
    try {
        const { nombre, departamento } = req.body;

        // const { error } = subjectQueryValidation.validate({ nombre, departamento });

        const { error } = subjectBodyValidation.validate({ nombre , departamento })

        if (error) return handleErrorClient(res, 400, error.message);

        const [subject, errorSubject] = await createSubjectService({ nombre, departamento });

        if (errorSubject) return handleErrorClient(res, 404, errorSubject);

        handleSuccess(res, 201, "Asignatura creada", subject);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateSubject(req, res) {
    try {
        const { id, nombre } = req.query;
        const { body } = req;

        const { error: bodyError } = subjectBodyValidation.validate(body);
        
        if (bodyError){
            return handleErrorClient(
                res,
                400,
                "Error en la validación de los datos",
                bodyError.message
            );
        }

        const { error: queryError } = subjectQueryValidation.validate({ id, nombre });

        if (queryError){
            return handleErrorClient(
                res,
                400,
                "Error en la validación de la consulta",
                queryError.message
            );
        }

        const [subject, errorSubject] = await updateSubjectsService({ id, nombre }, body);

        if (errorSubject)
            return handleErrorClient(res, 404, "Error modificando la asignatura", errorSubject);

        handleSuccess(res, 200, "Asignatura modificada correctamente", subject);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


export async function deleteSubject(req, res) {
    try {

        const { id, nombre } = req.query; 

        const { error : queryError } = subjectQueryValidation.validate({ id, nombre });

        if (queryError){
            return handleErrorClient(
                res,
                400,
                "Error en la validación de los datos",
                queryError.message
            );
        }

        const [subjectDelete, errorSubjectDelete] = await deleteSubjectService({ id, nombre });

        if (errorSubjectDelete)
            return handleErrorClient(res, 404, "Error eliminando la asignatura", errorSubjectDelete);

        handleSuccess(res, 200, "Asignatura eliminada correctamente", subjectDelete);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
