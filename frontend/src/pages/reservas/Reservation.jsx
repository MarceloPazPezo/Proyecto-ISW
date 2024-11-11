import { useState, useEffect } from 'react';
import '@styles/reservation.css';
import { getUserRol } from '../../services/user.service.js';
import PopupAddResource from '../../components/PopupAddResource.jsx';
import PopupEditReservation from '../../components/PopupEditReserva.jsx';
// import useGetReservation from '../../hooks/reservations/useGetReservation.jsx';
import useGetReservations from '../../hooks/reservations/useGetReservations.jsx';
import useDeleteResource from '../../hooks/resource/useDeleteResource.jsx';
import useDeleteReservation from '../../hooks/reservations/useDeleteReservation.jsx';
import useGetResources from '../../hooks/resource/useGetResources.jsx';
import { deleteReservation } from '../../services/reservation.service.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Reservation = () => {
    const [user, setUser] = useState(null);
    const [rol, setRol] = useState('');
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editResourceId, setEditResourceId] = useState(null); // Estado para almacenar el ID del recurso que se está editando
    const [viewReservationId, setViewReservationId] = useState(null); // Estado para almacenar el ID de la reserva que se quiere ver
    const [filteredReservations, setFilteredReservations] = useState([]); // Estado para almacenar las reservas filtradas
    const [currentReservationPage, setCurrentReservationPage] = useState(1); // Estado para manejar la página actual de las reservas filtradas
    const resourcesPerPage = 4;
    const reservationsPerPage = 2;

    const { resources, fetchResources, setDataResources } = useGetResources();
    const { handleDeleteRecurso } = useDeleteResource(fetchResources, setDataResources);
    const { reservations, fetchReservations } = useGetReservations();
    const { handleDeleteReserva } = useDeleteReservation(fetchReservations);

    const handleAddResourceClick = () => {
        setIsPopupAddOpen(true);
    };

    const handleDeleteClick = async (id) => {
        await fetchReservations(); // Obtener las reservas antes de proceder
        if (!reservations.data || reservations.data.length === 0) {
            await handleDeleteRecurso(id);
            return;
        } else {
            for (let i = 0; i < reservations.data.length; i++) {
                if (reservations.data[i].resource.id === id) {
                    await deleteReservation(reservations.data[i].id); // eliminar las reservas del recurso
                }
            }
            await handleDeleteRecurso(id);
        }
    };

    const handleEditClick = (id) => {
        setEditResourceId(id); // Almacenar el ID del recurso que se está editando
        setIsPopupEditOpen(true); // Mostrar el popup de edición
    };

    const handleGetClick = async (id) => {
        await fetchReservations(); 
        if (!reservations.data || reservations.data.length === 0) {
            return;
        } else {
            const filtered = reservations.data.filter(reservation => reservation.resource.id === id);
            setFilteredReservations(filtered);
            setViewReservationId(id);
            setCurrentReservationPage(1); // Resetear la página actual de las reservas filtradas
        }
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
                setUser(savedUser);
                try {
                    const userRol = await getUserRol(savedUser.email);
                    setRol(userRol);
                    // console.log('Rol del usuario:', userRol);
                } catch (error) {
                    console.error('Error al obtener el rol del usuario:', error);
                }
            }
        };

        fetchUserRole();
    }, []);

    const ROL = rol.data?.rol;
    const canManageResources = user && (ROL === 'admin' || ROL === 'encargado');
    const canReservate = user && (ROL === 'docente');

    // Calcular los recursos a mostrar en la página actual
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = resources.slice(indexOfFirstResource, indexOfLastResource);

    // Calcular las reservas a mostrar en la página actual
    const indexOfLastReservation = currentReservationPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);

    // Funciones para avanzar y retroceder páginas de reservas
    const nextReservationPage = () => {
        if (currentReservationPage < Math.ceil(filteredReservations.length / reservationsPerPage)) {
            setCurrentReservationPage(currentReservationPage + 1);
        }
    };

    const prevReservationPage = () => {
        if (currentReservationPage > 1) {
            setCurrentReservationPage(currentReservationPage - 1);
        }
    };

    // Funciones para avanzar y retroceder páginas de recursos
    const nextPage = () => {
        if (currentPage < Math.ceil(resources.length / resourcesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="main-container">
            <div className="reservation-container">
                <h1>Reservas de recursos {`(${ROL})`}</h1>
                {canManageResources && (
                    <button onClick={handleAddResourceClick}>
                        <FontAwesomeIcon icon={faPlus} /> Crear Recurso
                    </button>
                )}
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentResources) && currentResources.map((element, index) => (
                            <tr key={element.id}>
                                <td>{indexOfFirstResource + index + 1}</td> {/* Calcular el número de posición general */}
                                <td>{element.nombre}</td>
                                <td>{element.estado}</td>
                                <td>
                                    {canReservate && (
                                        <button disabled={element.estado === "RESERVADO"}>
                                            Reservar
                                        </button>
                                    )}
                                    {canManageResources && (
                                        <>
                                            <button1 onClick={() => handleEditClick(element.id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button1>
                                            <button1 onClick={() => handleDeleteClick(element.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button1>
                                            <button1 onClick={() => handleGetClick(element.id)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button1>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <buttonPag onClick={prevPage} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                    </buttonPag>
                    <buttonPag onClick={nextPage} disabled={currentPage === Math.ceil(resources.length / resourcesPerPage)}>
                        Siguiente <FontAwesomeIcon icon={faArrowRight} />
                    </buttonPag>
                </div>
            </div>
            <PopupAddResource show={isPopupAddOpen} setShow={setIsPopupAddOpen} />
            <PopupEditReservation show={isPopupEditOpen} setShow={setIsPopupEditOpen} resourceId={editResourceId} />
            {viewReservationId && (
                <div className="reservation-details">
                    <h2>Reservas del Recurso</h2>
                    {currentReservations.length === 0 ? (
                        <p>No hay reservas para este recurso.</p>
                    ) : (
                        <table className="reservation-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Hora Inicio</th>
                                    <th>Hora Fin</th>
                                    <th>Fecha</th>
                                    <th>Profesor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReservations.map(reservation => (
                                    <tr key={reservation.id}>
                                        <td>{reservation.id}</td>
                                        <td>{reservation.horaInicio}</td>
                                        <td>{reservation.horaFin}</td>
                                        <td>{new Date(reservation.fecha).toLocaleDateString()}</td>
                                        <td>{reservation.teacher === null ? "No solicitado" : reservation.teacher}</td>
                                        <td>
                                            <button onClick={() => handleDeleteReserva(reservation.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="pagination">
                        <buttonPag onClick={prevReservationPage} disabled={currentReservationPage === 1}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                        </buttonPag>
                        <buttonPag onClick={nextReservationPage} disabled={currentReservationPage === Math.ceil(filteredReservations.length / reservationsPerPage)}>
                            Siguiente <FontAwesomeIcon icon={faArrowRight} />
                        </buttonPag>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reservation;

