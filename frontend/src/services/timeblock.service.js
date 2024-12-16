import axios from './root.service.js';
import { formatTimeBlockData } from '@helpers/formatData.js';

export async function addTimeBlock(data) {
    try {

        const formattedData = formatTimeBlockData(data);

        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = formattedData;

        const response = await axios.post('/timeblock/timeBlock/', {
            idTeacher,
            idCourse,
            idSubject,
            horaInicio,
            horaTermino,
            diaSemana
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateTimeBlock(data) {
    try {

        const formattedData = formatTimeBlockData(data);

        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = formattedData;

        const response = await axios.patch(`/timeblock/detail/?detail?idTeacher=${idTeacher}&
            IdCourse=${idCourse}&idSubject=${idSubject}&horaInicio=${horaInicio}horaTermino=${horaTermino}&diaSemana=${diaSemana}`,
            {
                idTeacher,
                idCourse,
                idSubject,
                horaInicio,
                horaTermino,
                diaSemana
            });

        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteTimeBlock(data) {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = data;

        const response = await axios.delete(`/timeblock/detail/?detail?idTeacher=${idTeacher}&
            IdCourse=${idCourse}&idSubject=${idSubject}&horaInicio=${horaInicio}horaTermino=${horaTermino}&diaSemana=${diaSemana}`, data);

        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTimeBlocks() {
    try {
        const { data } = await axios.get('/timeblock/');
        // console.log(data);
        const formattedData = data.data.map(formatTimeBlockData);
        // console.log(formattedData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTimeBlock() {
    try {
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = data;
        const { data } = await axios.get(`/timeblock/detail/?detail?idTeacher=${idTeacher}&
            IdCourse=${idCourse}&idSubject=${idSubject}&horaInicio=${horaInicio}horaTermino=${horaTermino}&diaSemana=${diaSemana}`);
        const formattedData = data.data.map(formatTimeBlockData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}





