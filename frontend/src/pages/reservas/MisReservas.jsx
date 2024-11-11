import { useState } from 'react';
import DatePicker from 'react-datepicker'; // Importa el DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos
import '@styles/misreservas.css';

const MyReservation = () => {
    const [startDate, setStartDate] = useState(new Date()); // Estado para la fecha seleccionada

    const reservations = [
        {
            id: 1,
            fecha: '2021-09-20',
            horaInicio: '08:00',
            horaFin: '10:00',
            resource: {
                nombre: 'Proyector',
            },
        },
    ];

    return (
        <div className="my-reservations-container">
            <h1>Mis Reservaciones</h1>

            {/* DatePicker fuera del popup */}
            <div className="date-picker-container">
                <h2>Selecciona una fecha:</h2>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} // Actualiza la fecha al seleccionar
                    dateFormat="yyyy-MM-dd" // Formato de la fecha
                    className="datepicker-input" // Estilo opcional
                />
            </div>

            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Fin</th>
                        <th>Recurso</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.fecha}</td>
                            <td>{reservation.horaInicio}</td>
                            <td>{reservation.horaFin}</td>
                            <td>{reservation.resource.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyReservation;
