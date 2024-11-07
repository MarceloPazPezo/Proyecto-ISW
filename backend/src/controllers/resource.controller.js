"use strict"
import {
    createResourceService,
    deleteResourceService,
    getResourceService,
    getResourcesService,
    updateResourceService,
} from "../services/resource.service.js";
import {
    sourceBodyValidation,
    sourceQueryValidation,
} from "../validations/resource.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js"
import { subjectBodyValidation } from "../validations/subject.validation.js";

export async function createResource (req,res){ 
    try {

        const resourceBody = req.body;

        const { error } = subjectBodyValidation({ resourceBody })

        const [resource, errorResource] = await createResourceService({ resourceBody });

        if (errorResource) return handleErrorClient(res , 404 , errorResource)

        handleSuccess(res, 201, "Asignatura creada", resource);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getResources (req,res){
    try {

        const [resources, error] = await getResourcesService();

        if (error) return handleErrorClient(res, 404, error);

        resources.length > 0 ? handleSuccess(res, 200, "Recursos encontrados", resources) 
        : handleErrorClient(res, 404, "No se encontraron recursos");

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getResource (req,res){
    try {

        const { id , nombre } = req.query;

        const { error } = sourceQueryValidation({ id , nombre });

        if (error) return handleErrorClient(res, 400, error);

        const [resource, errorResource] = await getResourceService({ id , nombre });

        if (errorResource) return handleErrorClient(res, 404, errorResource);

        handleSuccess(res, 200, "Recurso encontrado", resource);

    } catch (error) {
        handleErrorServer(res , 404 , error.message)
    }
}

export async function updateResource (req,res){
    try {
        const { id , nombre } = req.query;
        const { body } = req;

        const { error: queryError } = sourceQueryValidation({ id, nombre });

        if (queryError) return handleErrorClient(res,404,error);

        const { error: bodyError } = sourceBodyValidation({ body });

        if (bodyError) return handleErrorClient(res,404,error);

        const [resource, errorResource] = await updateResourceService({ id, nombre } , body);

        if (errorResource) return handleErrorClient(res,404,errorResource);

        handleSuccess(res,200,"Recurso actualizado",resource);
    } catch (error) {
        handleErrorServer(res, 404, error.message)
    }
}

export async function deleteResource (req,res){
    try {
        const { id , nombre } = req.query;

        const { error } = sourceQueryValidation({ id , nombre });

        if (error) return handleErrorClient(res, 404, error);

        const [resource, errorResource] = await deleteResourceService({ id , nombre });

        if (errorResource) return handleErrorClient(res, 404, errorResource);

        handleSuccess(res, 200, "Recurso eliminado", resource);
    } catch (error) {
        handleErrorServer(res, 404, error.message);
    }
}