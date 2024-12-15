import { useState, useEffect } from 'react';
import { getCourses } from '@services/course.service.js';

const useGetCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            // console.log(response);
            const formattedData = response.map(courses => ({
                id: courses.id,
                nombre: courses.nombre,
                idBossTeacher: courses.idBossTeacher,
                idClassrom: courses.idClassrom,
                cantidadAlumnos: courses.cantidadAlumnos
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

export default useGetCourses;