import { useState, useEffect } from 'react';
import { getCourses } from '@services/course.service.js';

const useCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            const formattedData = response.map(course => ({
                id: course.id,
                nombre: course.nombre,
                idBossTeacher: course.idBossTeacher, 
                idClassroom: course.idClassroom,
            }));
            setCourses(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return { courses, fetchCourses, setCourses };
};

export default useCourses;