import { quitarAcentos } from '../helpers/formatData.js';
import axios from './root.service.js';
import { convertirMinusculas , formatSubjectData } from '@helpers/formatData.js';

export async function addSubject(data) {
    try {
        const dataRegister = quitarAcentos(convertirMinusculas(data));
        const { nombre, departamento } = dataRegister;
        const response = await axios.post('/subject', {
            nombre,
            departamento
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getSubjects() {
    try {
        const { data } = await axios.get('/subject/');
        const formattedData = data.data.map(formatSubjectData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateSubject(data, nombre) {
    try {
        const response = await axios.patch(`/subject/detail/?nombre=${nombre}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteSubject(nombre) {
    try {
        const response = await axios.delete(`/subject/detail/?nombre=${nombre}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}