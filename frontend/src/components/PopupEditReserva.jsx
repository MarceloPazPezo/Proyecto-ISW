import { useState } from 'react';
import '@styles/popupEditReserva.css';
import CloseIcon from '@assets/XIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css';
import { createReservation } from '../services/reservation.service.js';
import useAddReservation from '../hooks/reservations/useAddReservation.jsx';

export default function PopupEditReserva({ show, setShow, resourceId }) {
    const [dateType, setDateType] = useState('specific'); // 'specific' or 'period'
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedSlots, setSelectedSlots] = useState([]);

    const {
        // errorFecha, 
        // errorHoraIngreso, 
        // errorHoraSalida, 
        // inputData, 
        errorData,
        // handleInputChange 
    } = useAddReservation();

    const generateDateRange = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const handleSelectAll = () => {
        setSelectedSlots(timeSlots); // Selecciona todas las horas
    };

    const handleDeselectAll = () => {
        setSelectedSlots([]); // Elimina todas las selecciones
    };

    const handleCheckboxChange = (slot) => {
        setSelectedSlots(prevState => {
            if (prevState.includes(slot)) {
                return prevState.filter(item => item !== slot); // Elimina la selección
            } else {
                return [...prevState, slot]; // Añade la selección
            }
        });
    };

    const editSubmit = async (e) => {
        e.preventDefault();
        try {
            const recopilaciones = [];
            // console.log('Selected slots:', selectedSlots.length);

            if (selectedSlots.length === 0) {
                showErrorAlert('Error', 'Debe seleccionar al menos un horario.');
                return;
            }

            for (let i = 0; i < selectedSlots.length; i += 1) {
                const horaInicio = selectedSlots[i].slice(0, 5);
                const horaFin = selectedSlots[i].slice(-5);
                // console.log('Hora inicio:', horaInicio);
                // console.log('Hora fin:', horaFin);
                if (horaInicio && horaFin) {
                    if (dateType === 'specific') {
                        const recopilacion = {
                            idResource: resourceId,
                            horaInicio,
                            horaFin,
                            fecha: startDate
                        };
                        recopilaciones.push(recopilacion);
                    } else {

                        if (startDate > endDate) {
                            showErrorAlert('Error', 'La fecha de inicio no puede ser mayor a la fecha de fin.');
                            return;
                        }

                        const dates = generateDateRange(startDate, endDate);
                        for (const date of dates) {
                            const recopilacion = {
                                idResource: resourceId,
                                horaInicio,
                                horaFin,
                                fecha: date
                            };
                            recopilaciones.push(recopilacion);
                        }
                    }
                }
            }

            for (const recopilacion of recopilaciones) {
                // console.log('RecopilaciónPOPU:', recopilacion);
                const response = await createReservation(recopilacion);
                if (response.status !== 'Success') {
                    errorData('Error', response.details);
                    break;
                }
            }

            showSuccessAlert('¡Agregado!', 'El recurso ha sido agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar el recurso:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al agregar el recurso.');
        }
    };

    const timeSlots = [
        '08:00 - 08:45',
        '08:45 - 09:30',
        '09:30 - 09:50',
        '09:50 - 10:35',
        '10:35 - 11:20',
        '11:20 - 11:30',
        '11:30 - 12:15',
        '12:15 - 13:00',
        '13:00 - 13:55',
        '13:55 - 14:40',
        '14:40 - 15:25',
        '15:25 - 15:30',
        '15:30 - 16:15',
        '16:15 - 17:00',
        '17:00 - 17:10',
        '17:10 - 17:55',
        '17:55 - 18:40'
    ];

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup-edit-reserva">
                        <div className="popup-content">
                            <button className='close' onClick={() => setShow(false)}>
                                <img src={CloseIcon} alt="Close" />
                            </button>
                            <h2>Crear Reserva y Periodos</h2>
                            <form onSubmit={editSubmit} className="form-container">
                                <div className="form-group">
                                    <label>Hora/s de disponibilidad recurso/s</label>
                                    <div className="checkbox-actions">
                                        <button5 type="button" onClick={handleSelectAll}>Seleccionar todas</button5>
                                        <button5 type="button" onClick={handleDeselectAll}>Eliminar selección</button5>
                                    </div>
                                    {timeSlots.map(slot => (
                                        <div key={slot} className="checkbox-item">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="horario"
                                                    value={slot}
                                                    checked={selectedSlots.includes(slot)}
                                                    onChange={() => handleCheckboxChange(slot)}
                                                />
                                                {slot}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-group">
                                    <label>Tipo de fecha</label>
                                    <select name="dateType" value={dateType} onChange={(e) => setDateType(e.target.value)} required>
                                        <option value="specific">Día específico</option>
                                        <option value="period">Período</option>
                                    </select>
                                </div>
                                {dateType === 'specific' ? (
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="form-group">
                                            <label>Fecha de inicio</label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha de fin</label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <button type="submit">Guardar Cambios</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
