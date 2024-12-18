import { useState, useEffect } from 'react';
import { getTimeBlocks } from '@services/timeblock.service.js';

const useGetTimeBlocks = () => {
    const [timeblocks, setTimeBlocks] = useState([]);

    const fetchTimeBlocks = async () => {
        try {
            const response = await getTimeBlocks();
            // console.log(response);
            const formattedData = response.map(timeblock => ({
                id: timeblock.id,
                idTeacher: timeblock.idTeacher,
                idCourse: timeblock.idCourse,
                idSubject: timeblock.idSubject,
                horaInicio: timeblock.horaInicio,
                horaTermino: timeblock.horaTermino,
                diaSemana: timeblock.diaSemana
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

export default useGetTimeBlocks;