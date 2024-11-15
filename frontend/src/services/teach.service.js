import axios from './root.service.js';
import { formatClassroomData } from '@helpers/formatData.js';
import { convertirMinusculas } from '@helpers/formatData.js';

export async function addTeach(data) {
    try {
        const { idTeacher, idSubject, year } = data;

        const response = await axios.post('/teach', {
            idTeacher,
            idSubject,
            year
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTeachByTeacher() {
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