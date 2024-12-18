import { useState, useEffect } from 'react';
import { getTimeBlocks } from '@services/timeblock.service.js';
import useSubjects from '@hooks/subjects/useGetSubjects';
import useGetCourses from '@hooks/courses/useGetCourses';
import useTeachers from '@hooks/users/useGetTeachers';

const useGetTimeBlocks = () => {
    const [timeblocks, setTimeBlocks] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Nueva bandera para controlar la carga

    const { subjects } = useSubjects();
    const { courses } = useGetCourses();
    const { teachers } = useTeachers();

    const getTeacherNameById = (id) => {
        const teacher = teachers.find(t => t.id === id);
        return teacher ? teacher.nombreCompleto : 'Profesor no encontrado';
    };

    const getCourseNameById = (id) => {
        const course = courses.find(c => c.id === id);
        return course ? course.nombre : 'Curso no encontrado';
    };

    const getSubjectNameById = (id) => {
        const subject = subjects.find(s => s.id === id);
        return subject ? subject.nombre : 'Asignatura no encontrada';
    };

    const fetchTimeBlocks = async () => {
        try {
            const response = await getTimeBlocks();

            // Si los datos aún no están disponibles, espera antes de formatear
            if (!teachers.length || !courses.length || !subjects.length) {
                setIsDataLoaded(false); // Asegúrate de que no se cargue aún
                return;
            }

            const formattedData = response.map(timeblock => ({
                id: timeblock.id,
                idTeacher: timeblock.idTeacher,
                idCourse: timeblock.idCourse,
                idSubject: timeblock.idSubject,
                horaInicio: timeblock.horaInicio,
                horaTermino: timeblock.horaTermino,
                diaSemana: timeblock.diaSemana,
                teacherName: getTeacherNameById(timeblock.idTeacher),
                courseName: getCourseNameById(timeblock.idCourse),
                subjectName: getSubjectNameById(timeblock.idSubject),
            }));

            setTimeBlocks(formattedData);
            setIsDataLoaded(true); // Marca como completada la carga de datos
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Usa un efecto separado para esperar hasta que los datos estén disponibles
    useEffect(() => {
        if (teachers.length && courses.length && subjects.length) {
            fetchTimeBlocks();
        }
    }, [teachers, courses, subjects]); // Solo se ejecuta cuando estas dependencias están listas

    return { timeblocks, fetchTimeBlocks, setTimeBlocks, isDataLoaded };
};

export default useGetTimeBlocks;