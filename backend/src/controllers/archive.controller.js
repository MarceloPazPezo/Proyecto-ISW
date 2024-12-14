import path from "path";
import { HOST, PORT } from "../config/configEnv.js";
import { getArchivosService, subirArchivoService  } from "../services/archive.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import fs from "fs";

export async function uploadArchive(req, res) {
    try {
        const { nombre, idTeacher, mensaje } = req.body;
        let archivoPath = req.file?.path;
        if (!archivoPath) {
            archivoPath = req.body.archivo;
        }

        console.log("Body:" , req.body);
        console.log("Nombre: ", nombre);
        console.log("idTeacher: ", idTeacher);
        console.log("Mensaje: ", mensaje);
        console.log("Archivo: ", archivoPath);

        if (!mensaje || mensaje === "" || mensaje === null) {
            mensaje = "Sin mensaje adjunto";
        }

        if (!archivoPath) {
            return handleErrorClient(res, 400, "No se ha subido el archivo");
        }

        // Leer el archivo cargado como un buffer
        const archivoBuffer = fs.readFileSync(archivoPath);

        // Convertir el buffer a Base64
        const archivoBase64 = archivoBuffer.toString("base64");

        // Llamada al servicio para guardar el archivo en la base de datos
        const [newArchivo, error] = await subirArchivoService({ nombre, archivoBase64, idTeacher, mensaje });

        // Eliminar el archivo físico después de convertirlo (si ya no se necesita)
        fs.unlinkSync(archivoPath);

        if (error) {
            return handleErrorClient(res, 400, error);
        }

        handleSuccess(res, 201, "Archivo subido exitosamente", newArchivo);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


export async function getArchivos(req, res) {
    try {
        const [archivos, error] = await getArchivosService();

        if (error) {
            return handleErrorClient(res, 404, error);
        }

        archivos.length === 0
            ? handleSuccess(res, 200)
            : handleSuccess(res, 200, "Archivos encontrados", archivos);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}