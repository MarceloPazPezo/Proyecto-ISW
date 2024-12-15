import useAddTimeBlock from '@hooks/timeblocks/useAddTimeBlock';
import useGetTeachers from '@hooks/users/useGetTeachers';
import useGetSubjects from '@hooks/subjects/useGetSubjects';
import useGetCourses from '@hooks/courses/useGetCourses';
import { useState, useEffect, useCallback } from 'react';
import { addTimeBlock } from '@services/timeblock.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '../styles/asignarHorario.css';

export default function PopupAddTimeBlock({ isOpen, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [availableEndTimes, setAvailableEndTimes] = useState([]);

    const {
        errorDocente,
        inputDataDocente,
        errorAsignatura,
        inputDataAsignatura,
        errorCurso,
        inputDataCurso,
        errorHoraInicio,
        inputDataHoraInicio,
        errorHoraTermino,
        inputDataHoraTermino,
        errorDiaSemana,
        inputDataDiaSemana,
        handleInputChange,
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

    const [formData, setFormData] = useState({
        docente: '',
        asignatura: '',
        curso: '',
    });

    // Función para manejar los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualizar el estado general del formulario
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Si es horaInicio, actualizar las opciones de horaTermino
        if (name === 'horaInicio' && value) {
            const selectedStartTimeInMinutes = convertTimeToMinutes(value);
            const endTimeInMinutes = selectedStartTimeInMinutes + 45;
        
            if (endTimeInMinutes > 23 * 60 + 59) { // 23:59 in minutes
                showErrorAlert('Error', 'La hora de término excede el límite permitido.');
                setAvailableEndTimes([]);
                return;
            }
        
            const hours = Math.floor(endTimeInMinutes / 60).toString().padStart(2, '0');
            const minutes = (endTimeInMinutes % 60).toString().padStart(2, '0');
            const endTime = `${hours}:${minutes}`;
            setAvailableEndTimes([endTime]);
        }

        // Si el campo es manejado por useAddTimeBlock, sincronizar también
        if (['docente', 'asignatura', 'curso', 'horaInicio', 'horaTermino', 'diaSemana'].includes(name)) {
            handleInputChange(name, value);
        }
    };


    // Función para enviar los datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones de campos requeridos
        const requiredFields = ['docente', 'asignatura', 'curso', 'horaInicio', 'horaTermino', 'diaSemana'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                showErrorAlert('Error', `El campo ${field} es requerido.`);
                return;
            }
        }

        try {
            // Transformar los datos del formulario para el servicio
            const dataCorrecta = {
                idTeacher: formData.docente,
                idSubject: formData.asignatura,
                idCourse: formData.curso,
                horaInicio: formData.horaInicio,
                horaTermino: formData.horaTermino,
                diaSemana: formData.diaSemana,
            };

            // console.log("Enviando datos transformados:", dataCorrecta);

            const response = await addTimeBlock(dataCorrecta);

            if (response.status === 'Success') {
                showSuccessAlert('¡Registrado!', 'Bloque de tiempo registrado exitosamente.');
            } else {
                showErrorAlert('Error', response.details || 'No se pudo registrar el bloque de tiempo.');
            }
        } catch (error) {
            console.error("Error al registrar bloque:", error);
            showErrorAlert('Error', 'Ocurrió un problema al procesar la solicitud.');
        }
    };

    const handleEscKey = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleEscKey]);


    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);

                // Resetear los campos cuando el popup se cierra
                setFormData({
                    docente: '',
                    asignatura: '',
                    curso: '',
                    horaInicio: '',
                    horaTermino: '',
                    diaSemana: '',
                });

                // Resetear los valores sincronizados con `useAddTimeBlock`
                handleInputChange('docente', '');
                handleInputChange('asignatura', '');
                handleInputChange('curso', '');
                handleInputChange('horaInicio', '');
                handleInputChange('horaTermino', '');
                handleInputChange('diaSemana', '');

                // También reinicia las opciones de hora disponible
                setAvailableEndTimes([]);
            }, 0); // Coincide con la duración de la transición
            return () => clearTimeout(timer);
        }
    }, [isOpen, handleInputChange]);


    // Función para convertir la hora a minutos
    const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };


    return (
        isVisible && (
            <div className={`popup-overlay ${isOpen ? 'show' : ''}`}>
                <div className="popup-content">
                    <button className="close-button" onClick={onClose}>×</button>
                    <form onSubmit={handleSubmit} className='form-container'>
                        <div className='form-group'>
                            <label htmlFor='docente'>Docente</label>
                            <select
                                id='docente'
                                name='docente'
                                value={inputDataDocente.docente || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione un docente</option>
                                {teacherOptions.map((teacher) => (
                                    <option key={teacher.value} value={teacher.value}>
                                        {teacher.label}
                                    </option>
                                ))}
                            </select>
                            {errorDocente && <p className='error'>{errorDocente}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='asignatura'>Asignatura</label>
                            <select
                                id='asignatura'
                                name='asignatura'
                                value={inputDataAsignatura.asignatura || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione una asignatura</option>
                                {subjectOptions.map((subject) => (
                                    <option key={subject.value} value={subject.value}>
                                        {subject.label}
                                    </option>
                                ))}
                            </select>
                            {errorAsignatura && <p className='error'>{errorAsignatura}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='curso'>Curso</label>
                            <select
                                id='curso'
                                name='curso'
                                value={inputDataCurso.curso || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione un curso</option>
                                {courseOptions.map((course) => (
                                    <option key={course.value} value={course.value}>
                                        {course.label}
                                    </option>
                                ))}
                            </select>
                            {errorCurso && <p className='error'>{errorCurso}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='horaInicio'>Hora Inicio</label>
                            <select
                                id='horaInicio'
                                name='horaInicio'
                                value={inputDataHoraInicio.horaInicio || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione una hora</option>
                                <option value='08:00'>08:00</option>
                                <option value='08:45'>08:45</option>
                                <option value='09:50'>09:50</option>
                                <option value='10:35'>10:35</option>
                                <option value='11:30'>11:30</option>
                                <option value='12:15'>12:15</option>
                                <option value='13:55'>13:55</option>
                                <option value='14:40'>14:40</option>
                                <option value='15:30'>15:30</option>
                                <option value='16:15'>16:15</option>
                                <option value='17:10'>17:10</option>
                                <option value='17:55'>17:55</option>
                                {errorHoraInicio && <p className='error'>{errorHoraInicio}</p>}
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='horaTermino'>Hora Término</label>
                            <select
                                id='horaTermino'
                                name='horaTermino'
                                value={inputDataHoraTermino.horaTermino || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione una hora</option>
                                {availableEndTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                                {errorHoraTermino && <p className='error'>{errorHoraTermino}</p>}
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='diaSemana'>Día de la Semana</label>
                            <select
                                id='diaSemana'
                                name='diaSemana'
                                value={inputDataDiaSemana.diaSemana || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Seleccione un dia</option>
                                <option value='Lunes'>Lunes</option>
                                <option value='Martes'>Martes</option>
                                <option value='Miercoles'>Miercoles</option>
                                <option value='Jueves'>Jueves</option>
                                <option value='Viernes'>Viernes</option>
                                <option value='Sabado'>Sabado</option>
                            </select>
                            {errorDiaSemana && <p className='error'>{errorDiaSemana}</p>}
                        </div>

                        <button type='submit' className='submit-button'>Guardar Horario</button>
                    </form>
                </div>
            </div>
        )
    );
}
