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

export async function getTeachesByID(id) {
    try {
        const { data } = await axios.get(`/teach/teacher/detail/?id=${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteTeach(id) {
    try {
        const response = await axios.delete(`/teach/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al eliminar relación");
    }
}