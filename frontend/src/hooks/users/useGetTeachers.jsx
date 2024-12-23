import { useState, useEffect } from 'react';
import { getTeachers } from '@services/user.service.js';

const useTeachers = () => {
    const [teachers, setTeachers] = useState([]);

    const fetchTeachers = async () => {
        try {
            const response = await getTeachers();
            const formattedData = response.map(user => ({
                id: user.id,
                nombreCompleto: user.nombreCompleto,
                rut: user.rut,
                email: user.email,
                telefono: user.telefono,
                rol: user.rol,
                estado: user.estado,
                createdAt: user.createdAt
            }));
            dataLogged(formattedData);
            setTeachers(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { teachers, fetchTeachers, setTeachers };
};

export default useTeachers;