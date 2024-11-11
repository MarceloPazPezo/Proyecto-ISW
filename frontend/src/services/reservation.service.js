import axios from './root.service.js';
// import { convertirMinusculas } from '@helpers/formatData.js';

export async function createReservation(reservationData) {
    try {
        
        const { idResource, fecha, horaInicio, horaFin } = reservationData;

        console.log("Data!: ", idResource, fecha, horaInicio, horaFin);

        const response = await axios.post('reservation/detail', {
            idResource,
            fecha,
            horaInicio,
            horaFin,
            idTeacher: null
        });

        console.log("Respuesta front:" , response.data);

        return response.data;
 
    } catch (error) {
        return error.response.data;
    }
}

export async function getReservations() {
    try {

        const data = await axios.get('/reservation/');

        return data.data;
    
    } catch (error) {
        return error.response.data;
    }
}

export async function getReservation(id) {
    try {
        
        const data = await axios.get(`/reservation/detail/${id}`);

        return data.data;

    } catch (error) {
        return error.response.data;
    }
}

export async function updateReservation(reservationData) {
    try {

        console.log("Data: ", reservationData.idResource);
        
        const { id, idResource,  idTeacher, fecha, horaInicio, horaFin} = reservationData;

        const response = await axios.put(`/reservation/detail/`, {
            id,
            idResource,
            idTeacher,
            fecha,
            horaInicio,
            horaFin
        });

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}

export async function deleteReservation(id) {
    try {
        
        const response = await axios.delete(`/reservation/detail/?id=${id}`);

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}