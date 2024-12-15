import axios from './root.service.js';
import { formatCourseData } from '@helpers/formatData.js';

export async function addCourse(data) {
    try {
        const { nombre, idBossTeacher, idClassrom, cantidadAlumnos } = data;

        const response = await axios.post('/course/', {
            nombre,
            idBossTeacher,
            idClassrom,
            cantidadAlumnos
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateCourse(data) {
    try {
        const { nombre, idBossTeacher, idClassrom, cantidadAlumnos } = data;

        const response = await axios.patch(`/course/detail/?detail?nombre=${nombre}&
            idBossTeacher=${idBossTeacher}&idClassrom=${idClassrom}&cantidadAlumnos=${cantidadAlumnos}`, data)
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteCourse(data) {
    try {
        const { nombre, idBossTeacher, idClassrom, cantidadAlumnos } = data;

        const response = await axios.delete(`/course/detail/?detail?nombre=${nombre}&
            idBossTeacher=${idBossTeacher}&idClassrom=${idClassrom}&cantidadAlumnos=${cantidadAlumnos}`, data);
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