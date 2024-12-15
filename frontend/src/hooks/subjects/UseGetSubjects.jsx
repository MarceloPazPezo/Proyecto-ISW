import { useState, useEffect } from 'react';
import { getSubjects } from '@services/subject.service.js';

const useSubjects = () => {
    const [subjects, setSubjects] = useState([]);

    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
            const formattedData = response.map(subject => ({
                id: subject.id,
                nombre: subject.nombre,
                departamento: subject.departamento,
                createdAt: subject.createdAt
            }));
            setSubjects(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return { subjects, fetchSubjects, setSubjects };
};

export default useSubjects;