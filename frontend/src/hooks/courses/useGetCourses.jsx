import { useState, useEffect } from 'react';
import { getCourses } from '@services/course.service.js';

const useGetCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();

            const formattedData = response.map(course => ({
                id: course.id,
                nombre: course.nombre,
                idBossTeacher: course.idBossTeacher,
                rut: course.teacher.rut,
                nombreCompleto: course.teacher.nombreCompleto,
                idClassroom: course.idClassroom,
                nombreSala: course.classroom.nombre,
                cantidadAlumnos: course.cantidadAlumnos,
                createdAt: course.createdAt
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