import { useState } from 'react';
import PropTypes from 'prop-types';
import useAddTimeBlock from '@hooks/timeblocks/useAddTimeBlock';
import '../styles/asignarHorario.css';

const HorarioForm = ({ onSave }) => {
    const {
        errorHoraInicio,
        inputDataHoraInicio,
        errorHoraTermino,
        inputDataHoraTermino,
        errorFecha,
        inputDataFecha,
        errorData,
        handleInputChange,
    } = useAddTimeBlock();

    const [formData, setFormData] = useState({
        asignatura: '',
        curso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['horaInicio', 'horaTermino', 'fecha'].includes(name)) {
            handleInputChange(name, value);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputDataHoraInicio.horaInicio) {
            errorData({ dataInfo: 'horaInicio', message: 'Hora de inicio requerida' });
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

        const finalData = {
            ...formData,
            horaInicio: inputDataHoraInicio.horaInicio,
            horaTermino: inputDataHoraTermino.horaTermino,
            fecha: inputDataFecha.fecha,
        };

        console.log("Datos guardados:", finalData);

        // Llama a la función de la página si se necesita pasar datos
        if (onSave) onSave(finalData);

        // Resetea el formulario
        setFormData({ asignatura: '', curso: '' });
        handleInputChange('horaInicio', '');
        handleInputChange('horaTermino', '');
        handleInputChange('fecha', '');
    };

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <div className='form-group'>
                <label htmlFor='asignatura'>Asignatura</label>
                <input
                    type='text'
                    id='asignatura'
                    name='asignatura'
                    value={formData.asignatura}
                    onChange={handleChange}
                    required
                />
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
                    <option value=''>Seleccione un curso</option>
                    <option value='Curso 1'>Curso 1</option>
                    <option value='Curso 2'>Curso 2</option>
                    <option value='Curso 3'>Curso 3</option>
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
};

HorarioForm.propTypes = {
    onSave: PropTypes.func, // Función opcional para manejar datos guardados
};

export default HorarioForm;
