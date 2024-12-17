import useAddTimeBlock from '@hooks/timeblocks/useAddTimeBlock';
import useGetTeachers from '@hooks/users/useGetTeachers';
import useGetSubjects from '@hooks/subjects/useGetSubjects';
import useGetCourses from '@hooks/courses/useGetCourses';
import CloseIcon from '@assets/XIcon.svg';
import Form from './Form';
import { useState } from 'react';
import { addTimeBlock } from '@services/timeblock.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateTimeBlock } from '../helpers/formatData';
import '@styles/popup.css';

export default function PopupAddTimeBlock({ show, setShow, dataTimeBlocks }) {

    const {
        errorData,
    } = useAddTimeBlock();

    const {
        teachers,
    } = useGetTeachers();

    const {
        subjects,
    } = useGetSubjects();

    const {
        courses,
    } = useGetCourses();

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
        const newHoraTermino = terminoDate.toTimeString().slice(0,5);
        setHoraTermino(newHoraTermino);
    };


    const handleSubmit = async (addedTimeBlockData) => {
        if (addedTimeBlockData) {
            try {
                const response = await addTimeBlock(addedTimeBlockData);

                if (response.status === 'Client error') {
                    errorData(response.details);
                } else {
                    const formattedTimeBlock = formatPostUpdateTimeBlock(response.data);
                    showSuccessAlert('¡Registrado!', 'Bloque de tiempo registrado exitosamente.');
                    setShow(false);
                    dataTimeBlocks(prevTimeBlocks => [...prevTimeBlocks, formattedTimeBlock]);
                }
            } catch (error) {
                console.error("Error al registrar el bloque de tiempo: ", error);
                showErrorAlert('Cancelado', 'Ocurrió un error al registrar un bloque de tiempo.');
            }
        }
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
                                        defaultValue: "",
                                    },
                                    {
                                        label: "Asignatura",
                                        name: "idSubject",
                                        fieldType: 'select',
                                        options: subjectOptions,
                                        required: true,
                                        defaultValue: "",
                                    },
                                    {
                                        label: "Curso",
                                        name: "idCourse",
                                        fieldType: 'select',
                                        options: courseOptions,
                                        required: true,
                                        defaultValue: "",
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
