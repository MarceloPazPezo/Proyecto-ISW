import axios from './root.service.js';
import { convertirMinusculas, formatResourceData } from '@helpers/formatData.js'; 
// Convertir a minúsculas para almacenamiento en la BD y formato para mostrar en la vista

export async function getResources() {
    try {
        const data = await axios.get('/resource/');
        // console.log("Recursos: ", data.data);
        // const formattedData = data.data.map(formatResourceData)
        // console.log("Recursos formateados: ", formattedData);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getResource(id) {
    try {
        const data = await axios.get(`/resource/detail/${id}`);
        return formatResourceData(data.data);
    } catch (error) {
        return error.response.data;
    }
}

export async function createResource(resourceData) {
    try {
        const data = convertirMinusculas(resourceData);
        const {nombre , idManager} = data;

        // console.log("Datos->" + nombre + " - " + idManager);

        const response = await axios.post('/resource/detail/', {
            nombre,
            idManager
        });

        // console.log("Respuesta->" + response.data);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteResource(id) {
    try {
        // console.log("Srvice id: ", id);
        const response = await axios.delete(`/resource/detail/?id=${id}`);
        // console.log("Srvice response: ", response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateResource(resourceData) {
    try {
        const data = convertirMinusculas(resourceData);
        const { id, nombre, estado, idManager } = data;

        const response = await axios.put('/resource/detail', {
            id,
            nombre,
            estado,
            idManager
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}