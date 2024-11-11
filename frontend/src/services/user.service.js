import axios from './root.service.js';
import { convertirMinusculas, formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/user/');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUser(data, rut) {
    try {
        const response = await axios.patch(`/user/detail/?rut=${rut}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const response = await axios.delete(`/user/detail/?rut=${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function addTeacher(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const { nombreCompleto, email, rut, password, telefono } = dataRegister;

        const response = await axios.post('/user/teacher', {
            nombreCompleto,
            email,
            rut,
            password,
            telefono
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTeachers() {
    try {
        const { data } = await axios.get('/user/teacher');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUserRol(email){
    try {
        const { data } = await axios.get(`/user/rol/?email=${email}`); // crear ruta y service en backend
        
        // console.log("Data de getUserRol:" + data);

        localStorage.setItem('rol', JSON.stringify(data));
        return data;
    } catch (error) {
        return error.response.data;
    }
}