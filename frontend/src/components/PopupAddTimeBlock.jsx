import { useState } from 'react';
import useAddTimeBlock from '@hooks/timeblocks/useAddTimeBlock';
import useGetTeachers from '@hooks/users/useGetTeachers';
import useGetSubjects from '@hooks/subjects/useGetSubjects';
import { addTimeBlock } from '@services/timeblock.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '../styles/asignarHorario.css';

export default function PopupAddTimeBlock() {
    const {
        errorDocente,
        inputDataDocente,
        errorAsignatura,
        inputDataAsignatura,
        errorHoraInicio,
        inputDataHoraInicio,
        errorHoraTermino,
        inputDataHoraTermino,
        errorFecha,
        inputDataFecha,
        errorData,
        handleInputChange,
    } = useAddTimeBlock();

    const {
        teachers,
    } = useGetTeachers();

    const {
        subjects,
    } = useGetSubjects();

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

    const [formData, setFormData] = useState({
        asignatura: '',
        curso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['docentes', 'aisgnatura', 'horaInicio', 'horaTermino', 'fecha'].includes(name)) {
            handleInputChange(name, value);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Función para enviar los datos del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputDataDocente.docente) {
            errorData({ dataInfo: 'docente', message: 'Docente requerido' });
            return;
        }
        if (!inputDataAsignatura.asignatura) {
            errorData({ dataInfo: 'asignatura', message: 'Asignatura requerida' });
            return;
        }
        if (!inputDataHoraInicio.horaInicio) {
            errorData({ dataInfo: 'horaInicio', message: 'Hora de inicio requerida' });
            return;
        }
        if (!inputDataHoraTermino.horaTermino) {
            errorData({ dataInfo: 'horaTermino', message: 'Hora de termino requerida' });
            return;
        }
        if (!inputDataHoraTermino.horaTermino) {
            errorData({ dataInfo: 'horaTermino', message: 'Hora de termino requerida' });
            return;
        }
        if (!inputDataFecha.fecha) {
            errorData({ dataInfo: 'fecha', message: 'Fecha requerida' });
            return;
        }

        // Datos finales a enviar
        const finalData = {
            ...formData,
            docente: inputDataDocente.docente,
            asignatura: inputDataAsignatura.asignatura,
            horaInicio: inputDataHoraInicio.horaInicio,
            horaTermino: inputDataHoraTermino.horaTermino,
            fecha: inputDataFecha.fecha,
        };

        addTimeblock(finalData);

        console.log("Datos guardados:", finalData);

        // Resetea el formulario
        handleInputChange('docente', '');
        handleInputChange('asignatura', '');
        handleInputChange('horaInicio', '');
        handleInputChange('horaTermino', '');
        handleInputChange('fecha', '');
    };


    const addTimeblock = async (data) => {
        try {
            const response = await addTimeBlock(data);
            if (response.status === 'Success') {
                showSuccessAlert('¡Registrado!', 'Bloque de tiempo registrado exitosamente.');
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.error("Error al registrar un bloque de tiempo: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    }


    return (
        <form onSubmit={handleSubmit} className='form-container'>
            {/* SELECT DOCENTES */}
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
                    value={formData.curso}
                    onChange={handleChange}
                    required
                >
                    {/* <option value=''>Seleccione un curso</option>
                    <option value='Curso 1'>Curso 1</option>
                    <option value='Curso 2'>Curso 2</option>
                    <option value='Curso 3'>Curso 3</option> */}
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='horaInicio'>Hora de Inicio</label>
                <input
                    type='time'
                    id='horaInicio'
                    name='horaInicio'
                    value={inputDataHoraInicio.horaInicio}
                    onChange={handleChange}
                    required
                />
                {errorHoraInicio && <p className='error'>{errorHoraInicio}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='horaTermino'>Hora de Termino</label>
                <input
                    type='time'
                    id='horaTermino'
                    name='horaTermino'
                    value={inputDataHoraTermino.horaTermino}
                    onChange={handleChange}
                    required
                />
                {errorHoraTermino && <p className='error'>{errorHoraTermino}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='fecha'>Fecha</label>
                <input
                    type='date'
                    id='fecha'
                    name='fecha'
                    value={inputDataFecha.fecha}
                    onChange={handleChange}
                    required
                />
                {errorFecha && <p className='error'>{errorFecha}</p>}
            </div>
            <button type='submit' className='submit-button'>Asignar Horario</button>
        </form>
    );
}
