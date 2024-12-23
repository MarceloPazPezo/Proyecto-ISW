import { useState, useEffect } from 'react';
import { getClassrooms } from '@services/classroom.service.js';

const useClassrooms = () => {
    const [classrooms, setClassrooms] = useState([]);

    const fetchClassrooms = async () => {
        try {
            const response = await getClassrooms();
            const formattedData = response.map(classroom => ({
                id: classroom.id,
                nombre: classroom.nombre,
                estado: classroom.estado,
                capacidad: classroom.capacidad,
                createdAt: classroom.createdAt
            }));
            setClassrooms(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchClassrooms();
    }, []);

    return { classrooms, fetchClassrooms, setClassrooms };
};

export default useClassrooms;