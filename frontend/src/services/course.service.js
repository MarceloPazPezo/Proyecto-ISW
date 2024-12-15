import { quitarAcentos } from '../helpers/formatData.js';
import axios from './root.service.js';
import { convertirMinusculas , formatCourseData } from '@helpers/formatData.js';

export async function addCourse(data) {
    try {
        const dataRegister = quitarAcentos(convertirMinusculas(data));
        const { nombre } = dataRegister;
        const response = await axios.post('/course', {
            nombre
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getCourses() {
    try {
        const { data } = await axios.get('/course/');
        const formattedData = data.data.map(formatCourseData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateCourse(data, nombre) {
    try {
        const response = await axios.patch(`/course/detail/?nombre=${nombre}`, data);
        return response.data;
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