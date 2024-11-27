import axios from './root.service.js';

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

export async function getTeachesByTeacher(rut) {
    try {
        const { data } = await axios.get(`/teach/teacher/detail/?rut=${rut}`);
        return data;
    } catch (error) {
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