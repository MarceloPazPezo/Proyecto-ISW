import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/misreservas.css';
import useGetReservations from '../../hooks/reservations/useGetReservations';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDeleteReservation from '../../hooks/reservations/useDeleteReservation';

const MisReservas = () => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [reservations, setReservations] = useState([]);
    
    const { fetchReservations, reservations: fetchedReservations, loading } = useGetReservations();
    const { handleDeleteReserva } = useDeleteReservation(fetchReservations);

    // Obtén el usuario desde sessionStorage y las reservas
    useEffect(() => {
        const fetchUserAndReservations = async () => {
            if (fetchedReservations.data && fetchedReservations.data.length > 0) {
                // Filtra las reservas para el ID del usuario
                const filteredReservations = fetchedReservations.data.filter(reservation => 
                    reservation.idTeacher === userId
                );
                setReservations(filteredReservations); // Actualiza el estado con las reservas filtradas
            }
        };

        fetchUserAndReservations();
    }, [fetchedReservations, userId]);

    useEffect(() => {
        const savedUser = JSON.parse(sessionStorage.getItem('usuario'));
        if (savedUser) {
            setUser(savedUser);
            setUserId(savedUser.id);
            console.log('Usuario cargado:', savedUser);
        }
    }, []);

    // Mostrar cargando si las reservas aún no están listas
    if (loading) {
        return <p>Cargando reservas...</p>;
    }

    return (
        <div className="main-container">
            <div className="reservation-container">
                <h1>Mis Reservas</h1>
                {user && <p>Usuario: {user.nombreCompleto}</p>}
                {reservations.length > 0 ? (
                    <table className="reservations-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Recurso</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{new Date(reservation.fecha).toLocaleDateString()}</td>
                                    <td>{reservation.horaInicio}</td>
                                    <td>{reservation.horaFin}</td>
                                    <td>{reservation.resource.nombre}</td>
                                    <td>
                                        <button onClick={() => handleDeleteReserva(reservation)}> 
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tienes reservas.</p>
                )}
            </div>
        </div>
    );
};

export default MisReservas;
