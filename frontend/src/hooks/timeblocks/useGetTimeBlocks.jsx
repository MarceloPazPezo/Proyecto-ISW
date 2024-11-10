import { useState, useEffect } from 'react';
import { getTimeBlocks } from '@services/timeblock.service.js';

const useTimeBlocks = () => {
    const [timeblocks, setTimeBlocks] = useState([]);

    const fetchTimeBlocks = async () => {
        try {
            const response = await getTimeBlocks();
            const formattedData = response.map(timeblock => ({
                idTeacher: timeblock.idTeacher,
                idCourse: timeblock.idCourse,
                idSubject: timeblock.idSubject,
                horaInicio: timeblock.horaInicio,
                horaTermino: timeblock.horaTermino,
                fecha: timeblock.fecha
            }));
            setTimeBlocks(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchTimeBlocks();
    }, []);

    return { timeblocks, fetchTimeBlocks, setTimeBlocks };
};

export default useTimeBlocks;