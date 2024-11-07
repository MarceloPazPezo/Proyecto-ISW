"use strict";
import Source from "../entity/resource.entity.js";
import { AppDataSource } from "../config/configDb";

export async function getResourceService(query) {
    try {

        const { id , nombre , idManager } = query;

        const resourcesRepository = AppDataSource.getRepository(Source);

        const resourceFound = await resourcesRepository.findOne({
            where: [{ id }, { nombre }, { idManager }],
            relations: ["manager"],
        });

        if (!resourceFound) return [null, "No se encontró el recurso solicitado."]

        return [resourceFound, null];
    } catch (error) {
        console.error("Error al obtener el recurso: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function getResourcesService() {
    try {
        const resourcesRepository = AppDataSource.getRepository(Source);

        const resourcesFound = await resourcesRepository.find({
            relations: ["manager"],
        });

        return [resourcesFound, null];
    } catch (error) {
        console.error("Error al obtener los recursos: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function createResourceService(dataResource) {
    try {

        const resourcesRepository = AppDataSource.getRepository(Source);

        const { id , nombre, idManager } = dataResource;

        const createErrorMessage = (dataInfo , message) => {
            return {
                dataInfo,
                message
            }
        }

        const existingResource = await resourcesRepository.findOne({ nombre });

        if (existingResource) return [null, createErrorMessage(dataResource, "El recurso ya existe.")];

        const existingidResource = await resourcesRepository.findOne ({ id });

        if (existingidResource) return [null, createErrorMessage(dataResource, "El id del recurso ya existe.")];

        const newResource = resourcesRepository.create({
            nombre : dataResource.nombre,
            manager : dataResource.idManager,
            estado : "disponible",
        });

        const resourceSaved = await resourcesRepository.save(newResource);

        return [resourceSaved, null];
    } catch (error) {
        console.error("Error al crear el recurso: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function updateResourceService(query, body) {
    try {

        const { id , nombre , idManager } = query;

        const resourcesRepository = AppDataSource.getRepository(Source);

        const resourceFound = await resourcesRepository.findOne({
            where: [{ id }, { nombre }, { idManager }],
            relations: ["manager"],
        });

        if (!resourceFound) return [null, "No se encontró el recurso solicitado."]

        const existingResource = await resourcesRepository.findOne({ 
            where : { nombre : body.nombre }
        });

        if (existingResource && existingResource.id !== resourceFound.id){ 
            return [null, "El recurso ya existe."];
        }

        const dataResource = {
            nombre : body.nombre,
            manager : body.idManager,
            estado : body.estado,
            updatedAt: new Date(),
        }

        await resourcesRepository.update({ id : resourceFound.id }, dataResource );

        const resourceUpdated = await resourcesRepository.findOne({ id : resourceFound.id });

        if (!resourceUpdated) return [null, "No se pudo actualizar el recurso."];

        return [resourceUpdated, null];

    } catch (error) {
        console.error("Error al actualizar el recurso: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function deleteResourceService(query) {
    try {

        const { id , nombre , idManager } = query;

        const resourcesRepository = AppDataSource.getRepository(Source);

        const resourceFound = await resourcesRepository.findOne({
            where: [{ id }, { nombre }, { idManager }],
            relations: ["manager"],
        });

        if (!resourceFound) return [null, "No se encontró el recurso solicitado."]

        const resourceData = await resourcesRepository.delete({ id : resourceFound.id });

        return [resourceData, null];

    } catch (error) {
        console.error("Error al eliminar el recurso: ", error);
        return [null, "Error interno del servidor."];
    }
}