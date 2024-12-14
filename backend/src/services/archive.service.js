"use strict"

import Archivo from "../entity/archive.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function subirArchivoService(dataArchivo){
    try {
        const archivoRepository = AppDataSource.getRepository(Archivo);

        const { nombre, archivoBase64, idTeacher, mensaje } = dataArchivo;

        console.log("dataArchivo", dataArchivo);

        const newArchivo = archivoRepository.create({
            nombre,
            archivo: archivoBase64,
            idTeacher,
            mensaje
        });

        await archivoRepository.save(newArchivo);

        return [newArchivo, null];
    } catch (error) {
        console.error("Error al subir el archivo", error);
        return [null, "Error interno del servidor"];
    }   
}

export async function getArchivosService(){
    try {
        const archivoRepository = AppDataSource.getRepository(Archivo);

        const archivos = await archivoRepository.find();
        
        return [archivos, null];
    } catch (error) {
        console.error("Error al obtener los archivos", error);
        return [null, "Error interno del servidor"];
    }
}