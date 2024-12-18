import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useGetTeachers from '@hooks/users/useGetTeachers';
import useGetSubjects from '@hooks/subjects/useGetSubjects';
import useGetCourses from '@hooks/courses/useGetCourses';
import { useState } from 'react';

export default function PopupEditCourse({ show, setShow, data, action }) {
    const timeBlockData = data && data.length > 0 ? data[0] : {};

    const {
        teachers,
    } = useGetTeachers();

    const {
        subjects,
    } = useGetSubjects();

    const {
        courses,
    } = useGetCourses(); 

    // const { teachers } = useTeachers();

    // const defaultTeacher = teachers.find(teacher => teacher.id === courseData.idBossTeacher) || null;


    const handleSubmit = (formData) => {
        const fullData = {
            ...formData,
            id: timeBlockData.id,
        };
        action(fullData);
    };

    
    // console.log("Estos son Docentes:", teachers);
    // console.log("Estos son Asignaturas:", subjects);
    // console.log("Estos son Cursos:", courses);

    // mapea los docentes para mostrarlos en el select
    const teacherOptions = teachers.map((teacher) => ({
        value: teacher.id,
        label: teacher.nombreCompleto,
    }));

    // mapea las asignaturas para mostrarlas en el select
    const subjectOptions = subjects.map((subject) => ({
        value: subject.id,
        label: subject.nombre,
    }));

    // mapea los cursos para mostrarlos en el select
    const courseOptions = courses.map((course) => ({
        value: course.id,
        label: course.nombre,
    }));

    const [horaInicio, setHoraInicio] = useState("");
    const [horaTermino, setHoraTermino] = useState("");

    const handleHoraInicioChange = (e) => {
        const selectedHoraInicio = e.target.value;
        setHoraInicio(selectedHoraInicio);
        const [hours, minutes] = selectedHoraInicio.split(':').map(Number);
        const terminoDate = new Date();
        terminoDate.setHours(hours);
        terminoDate.setMinutes(minutes + 45);
        const newHoraTermino = terminoDate.toTimeString().slice(0, 5);
        setHoraTermino(newHoraTermino);
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <div className="popup-content">
                            <button className='close' onClick={() => setShow(false)}>
                                <img src={CloseIcon} />
                            </button>
                            <Form
                                title="Asignar Horario"
                                fields={[
                                    {
                                        label: "Docente",
                                        name: "idTeacher",
                                        fieldType: 'select',
                                        options: teacherOptions,
                                        required: true,
                                        defaultValue: timeBlockData.idTeacher,
                                    },
                                    {
                                        label: "Asignatura",
                                        name: "idSubject",
                                        fieldType: 'select',
                                        options: subjectOptions,
                                        required: true,
                                        defaultValue: timeBlockData.idSubject,
                                    },
                                    {
                                        label: "Curso",
                                        name: "idCourse",
                                        fieldType: 'select',
                                        options: courseOptions,
                                        required: true,
                                        defaultValue: timeBlockData.idCourse,
                                    },
                                    {
                                        label: "Hora Inicio",
                                        name: "horaInicio",
                                        fieldType: 'select',
                                        options: [
                                            { value: '08:00', label: '08:00' },
                                            { value: '08:45', label: '08:45' },
                                            { value: '09:50', label: '09:50' },
                                            { value: '10:35', label: '10:35' },
                                            { value: '11:30', label: '11:30' },
                                            { value: '12:15', label: '12:15' },
                                            { value: '13:55', label: '13:55' },
                                            { value: '14:40', label: '14:40' },
                                            { value: '15:30', label: '15:30' },
                                            { value: '16:15', label: '16:15' },
                                            { value: '17:10', label: '17:10' },
                                            { value: '17:55', label: '17:55' }
                                        ],
                                        required: true,
                                        onChange: handleHoraInicioChange,
                                    },
                                    {
                                        label: "Hora Termino",
                                        name: "horaTermino",
                                        fieldType: 'select',
                                        options: horaTermino ? [{ value: horaTermino, label: horaTermino }] : [],
                                        required: true,
                                    },
                                    {
                                        label: "Día Semana",
                                        name: "diaSemana",
                                        fieldType: 'select',
                                        options: [
                                            { value: "Lunes", label: "Lunes" },
                                            { value: "Martes", label: "Martes" },
                                            { value: "Miércoles", label: "Miércoles" },
                                            { value: "Jueves", label: "Jueves" },
                                            { value: "Viernes", label: "Viernes" },
                                            { value: "Sábado", label: "Sábado" },
                                        ],
                                        required: true,
                                        defaultValue: "",
                                    },
                                ]}
                                buttonText="Asignar Horario"
                                onSubmit={handleSubmit}
                                backgroundColor={'#fff'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}