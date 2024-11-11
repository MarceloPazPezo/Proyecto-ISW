import axios from './root.service.js';
import { formatTimeBlockData } from '@helpers/formatData.js';

export async function addTimeBlock(data) {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, fecha } = data;

        const response = await axios.post('/timeblock/timeBlock', {
            idTeacher,
            idCourse,
            idSubject,
            horaInicio,
            horaTermino,
            fecha
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTimeBlocks() {
    try {
        const { data } = await axios.get('/timeblock/');
        const formattedData = data.data.map(formatTimeBlockData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTimeBlock() {
    try {
        const { data } = await axios.get('`/timeblock/detail/?id=${id}`');
        const formattedData = data.data.map(formatTimeBlockData);
        return formattedData;
    } catch (error) {   
        return error.response.data;
    }
}

export async function updateTimeBlock(data, id) {
    try {
        const response = await axios.patch(`/timeblock/detail/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteTimeBlock(id) {
    try {
        const response = await axios.delete(`/timeblock/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}





