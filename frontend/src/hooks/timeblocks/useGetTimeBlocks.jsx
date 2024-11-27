import { useState, useEffect } from 'react';
import { getTimeBlocks } from '@services/timeblock.service.js';

const useGetTimeBlocks = () => {
    const [timeblocks, setTimeblocks] = useState([]);

    const fetchTimeBlocks = async () => {
        try {
            const response = await getTimeBlocks();
            console.log(response);
            const formattedData = response.map(timeblock => ({
                idTeacher: timeblock.idTeacher,
                idCourse: timeblock.idCourse,
                idSubject: timeblock.idSubject,
                horaInicio: timeblock.horaInicio,
                horaTermino: timeblock.horaTermino,
                fecha: timeblock.fecha
            }));
            setTimeblocks(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchTimeBlocks();
    }, []);

    return { timeblocks, fetchTimeBlocks, setTimeblocks };
};

export default useGetTimeBlocks;