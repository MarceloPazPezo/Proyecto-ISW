import axios from './root.service.js';
import { formatClassroomData } from '@helpers/formatData.js';
import { convertirMinusculas } from '@helpers/formatData.js';

export async function addClassroom(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const { nombre, estado } = dataRegister;

        const response = await axios.post('/classroom', {
            nombre,
            estado
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
        const response = await axios.patch(`/classroom/detail/?nombre=${nombre}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteClassroom(nombre) {
    try {
        const response = await axios.delete(`/classroom/detail/?nombre=${nombre}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}