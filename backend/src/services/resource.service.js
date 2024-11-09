"use strict";
import Source from "../entity/resource.entity.js";
import { AppDataSource } from "../config/configDb.js";

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

        const resourcesFound = await resourcesRepository.find()

        if (!resourcesFound) return [null, "No se encontraron recursos."];

        return [resourcesFound];
    } catch (error) {
        console.error("Error al obtener los recursos: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function createResourceService(dataResource) {
    try {

        const resourcesRepository = AppDataSource.getRepository(Source);

        // console.log("Datos1_>" + dataResource.nombre + " - " + dataResource.idManager);

        const { nombre, idManager } = dataResource;

        const createErrorMessage = (dataInfo , message) => {
            return {
                dataInfo,
                message
            }
        }

        // console.log("Datos_>" + nombre + " - " + idManager);

        // Verifica si ya existe un recurso con ese nombre
        const existingResource = await resourcesRepository.findOne({ where: { nombre } });

        if (existingResource) return [null, createErrorMessage(dataResource, "El recurso ya existe.")];

        // Si no existe, crea un nuevo recurso
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

        // console.log("ServiceBK id: ", query);

        const { id } = query;

        const resourcesRepository = AppDataSource.getRepository(Source);

        const resourceFound = await resourcesRepository.findOne({
            where: [{ id }],
        });

        if (!resourceFound) return [null, "No se encontró el recurso solicitado."]

        const resourceData = await resourcesRepository.remove({ id : resourceFound.id });

        return [resourceData, null];

    } catch (error) {
        console.error("Error al eliminar el recurso: ", error);
        return [null, "Error interno del servidor."];
    }
}