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
        // console.log('data:', data);

        const { id, idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = data;    
        // console.log(diaSemana);
        const response = await axios.patch(`/timeblock/detail/?detail?id=${id}&idTeacher=${parseInt(idTeacher, 10)}&IdCourse=${parseInt(idCourse, 10)}&idSubject=${parseInt(idSubject, 10)}&horaInicio=${horaInicio.split(":").slice(0, 2).join(":")}&horaTermino=${horaTermino.split(":").slice(0, 2).join(":")}&diaSemana=${diaSemana}`,
            {
                idTeacher: parseInt(idTeacher, 10),
                idCourse: parseInt(idCourse, 10),
                idSubject: parseInt(idSubject, 10),
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
        const { idTeacher, idCourse, idSubject, horaInicio, horaTermino, diaSemana } = data[0];
        // console.log('data:', data);

        const response = await axios.delete(`/timeblock/detail/?detail?idTeacher=${idTeacher}&IdCourse=${idCourse}&idSubject=${idSubject}&horaInicio=${horaInicio.split(":").slice(0, 2).join(":")}&horaTermino=${horaTermino.split(":").slice(0, 2).join(":")}&diaSemana=${diaSemana}`, data);

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
        const { data } = await axios.get(`/timeblock/detail/?detail?idTeacher=${idTeacher}&IdCourse=${idCourse}&idSubject=${idSubject}&horaInicio=${horaInicio}&horaTermino=${horaTermino}&diaSemana=${diaSemana}`);
        const formattedData = data.data.map(formatTimeBlockData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}





