import { quitarAcentos } from '../helpers/formatData.js';
import axios from './root.service.js';
import { convertirMinusculas , formatCourseData } from '@helpers/formatData.js';

export async function addCourse(data) {
    try {
        const dataFormatted = quitarAcentos(convertirMinusculas(data));
        const { nombre, idBossTeacher, idClassroom, cantidadAlumnos } = dataFormatted;

        const response = await axios.post('/course/', {
            nombre,
            idBossTeacher,
            idClassroom,
            cantidadAlumnos
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateCourse(data, nombreActual) {
    try {
        const { nombre, idBossTeacher, idClassroom, cantidadAlumnos } = data;
        const response = await axios.patch(`/course/detail/?nombre=${nombreActual}`, {
            nombre,
            idBossTeacher,
            idClassroom,
            cantidadAlumnos
        });
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteCourse(nombre) {
    try {
        const response = await axios.delete(`/course/detail/?nombre=${nombre}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getCourses() {
    try {
        const {data} = await axios.get('/course/');
        const formattedData = data.data.map(formatCourseData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getCourse(data) {
    try {
        const { nombre, idBossTeacher, idClassrom, cantidadAlumnos } = data;

        const response = await axios.get(`/course/detail/?detail?nombre=${nombre}&
            idBossTeacher=${idBossTeacher}&idClassrom=${idClassrom}&cantidadAlumnos=${cantidadAlumnos}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}