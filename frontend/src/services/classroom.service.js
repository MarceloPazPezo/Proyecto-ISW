import axios from './root.service.js';
import { convertirMinusculas , formatClassroomData } from '@helpers/formatData.js';

export async function addClassroom(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const estado = dataRegister.estado;
        const nombre = dataRegister.nombre.toUpperCase();
        const capacidad = dataRegister.capacidad;
        const response = await axios.post('/classroom', {
            nombre,
            estado,
            capacidad
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getClassrooms() {
    try {
        const { data } = await axios.get('/classroom/');
        const formattedData = data.data.map(formatClassroomData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateClassroom(data, nombre) {
    try {
        const response = await axios.patch(`/classroom/detail/?nombre=${nombre.toUpperCase()}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteClassroom(nombre) {
    try {
        const response = await axios.delete(`/classroom/detail/?nombre=${nombre.toUpperCase()}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}