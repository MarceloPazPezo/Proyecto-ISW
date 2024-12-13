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
import useEditReservation from '../../hooks/reservations/useEditReservation.jsx';
import { deleteReservation } from '../../services/reservation.service.js';
// import { getReservationbyID } from '../../services/reservation.service.js';
import { getReservations } from '../../services/reservation.service.js';
import { updateResource } from '../../services/resource.service.js';
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
    const [sortCriteria, setSortCriteria] = useState({ field: 'fecha', direction: 'asc' }); // Estado para manejar el criterio de ordenación
    const [showPastReservations, setShowPastReservations] = useState(false); // Estado para manejar la vista de reservas pasadas o futuras
    const [selectedResource, setSelectedResource] = useState(null);
    const [isReservationPopupOpen, setIsReservationPopupOpen] = useState(false);
    const resourcesPerPage = 4;
    const reservationsPerPage = 4;

    const { resources, fetchResources, setDataResources } = useGetResources();
    const { handleDeleteRecurso } = useDeleteResource(fetchResources, setDataResources);
    const { reservations, fetchReservations } = useGetReservations();
    const { handleDeleteReserva } = useDeleteReservation(fetchReservations);
    const [reservationsData, setReservationsData] = useState([]);
    const [user2, setUser2] = useState(null);
    const [userId, setUserId] = useState(null);
    const [reservations2, setReservations] = useState([]); // Estado de las reservas
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataReservation,
        setDataReservation
    } = useEditReservation(setReservations);



    useEffect(() => {
        const savedUser = JSON.parse(sessionStorage.getItem('usuario'));
        if (savedUser) {
            setUser2(savedUser);
            setUserId(savedUser.id);
            console.log('Usuario cargado:', savedUser);
        }
    }, []);

    useEffect(() => {
        fetchAndModifyResources();
    }, [reservations]); // Se ejecuta cada vez que cambian las reservas

    const fetchAndModifyResources = async () => {
        try {
            // Llamamos a fetchResources para obtener los datos
            await fetchResources();
    
            // Recorremos todos los recursos
            // resources.map(resource => {
            for (let i = 0; i < resources.length; i++) {
                let count = 0; // Contador para verificar si todas las reservas tienen idTeacher nulo
                let tieneReservaDisponible = false; // Inicialmente asumimos que todas las reservas son nulas (sin idTeacher)
                // Recorre todas las reservas
                    console.log('RecursoID:', resources[i].id, 'Nombre:', resources[i].nombre);
                    // console.log('Reservas:', reservations.data);
                    for (let j = 0; j < reservations.data.length; j++) {
                        console.log('ReservaID:', reservations.data[j].idResource);
                        if (resources[i].id === reservations.data[j].idResource) {
                            console.log('SONIGUALESSSSSSSSSSSS:', reservations.data);
                        // Verifica si la reserva corresponde al recurso actual
                        // if (reservations.data[i].resourceId === resource.id) {
                            // Si encuentra una reserva con un idTeacher válido, cambia la bandera
                            if (reservations.data[i].idTeacher == null) {
                                tieneReservaDisponible = true;
                                // count++;
                                break; // Ya no es necesario seguir buscando
                            }
                        // }
                        }
                    }

                console.log('Contador:', count);

                // Lógica para modificar el estado según las reservas
                if (tieneReservaDisponible) {
                    // Si todas las reservas del recurso no tienen idTeacher nulo
                    resources[i].estado = 'DISPONIBLE';
                    console.log('Recurso disponible (existe alguna con idTeacher nulo):', resources[i].nombre);
                } else {
                    // Si hay al menos una reserva con idTeacher nulo
                    resources[i].estado = 'RESERVADO';
                    console.log('Recurso reservado (ninguna reserva con idTeacher nulo):', resources[i].nombre);
                }

                // Actualizamos el recurso
                updateResource(resources[i]);  
            }
        } catch (error) {
            console.error('Error al obtener los recursos:', error);
        }
    };
    
    
    const closeReservationPopup = () => {
        setSelectedResource(null);
        setIsReservationPopupOpen(false);
    };

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

    const handleGetClick2 = async (id) => {
        // Suponiendo que fetchReservations es una función que obtiene todas las reservas
        const reservations = await getReservations();
        console.log('ReservaSSSSSSSSSSSSSSSSSSs:', reservations);
    
        // Verifica que `data` esté presente y sea un array
        if (!reservations.data || !Array.isArray(reservations.data)) {
            console.log('No se encontraron reservas o la estructura es incorrecta.');
            return;
        }
    
        // Guardamos las reservas disponibles en el estado
        console.log('Reserva>>>>>>>>>>>>>>>>>>>:', id.id);
        console.log(reservations.data.length);
    
        // Creamos un array para almacenar las reservas que coinciden
        const matchingReservations = [];
    
        let found = false; // Bandera para verificar si encontramos una reserva
        for (let i = 0; i < reservations.data.length; i++) {
            if (reservations.data[i].idResource === id.id) {
                console.log('ID recurso 1:', reservations.data[i].idResource);
                console.log('ID recurso 2:', id);
                console.log('Hay reservas disponibles para este recurso.');
    
                // Almacenamos todas las reservas que coinciden en el array
                matchingReservations.push(reservations.data[i]);
                found = true; // Indicamos que encontramos al menos una reserva
            }
        }
    
        // Guardamos las reservas encontradas en el estado
        setReservationsData(matchingReservations);
    
        console.log('Reservas encontradas:', matchingReservations);
    
        setIsReservationPopupOpen(true);
    
        if (!found) {
            console.log('No hay reservas disponibles para este recurso.');
        }
    };
      

    const sortReservations = (reservations, criteria) => {
        return reservations.sort((a, b) => {
            if (criteria.field === 'fecha') {
                return criteria.direction === 'asc' ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha);
            } else if (criteria.field === 'horaInicio') {
                return criteria.direction === 'asc' ? a.horaInicio.localeCompare(b.horaInicio) : b.horaInicio.localeCompare(a.horaInicio);
            }
            return 0;
        });
    };

    const handleSort = (field) => {
        setSortCriteria(prevCriteria => ({
            field,
            direction: prevCriteria.field === field && prevCriteria.direction === 'asc' ? 'desc' : 'asc'
        }));
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

    const handleAssignTeacher = (id) => {
        const idTeacher = userId;
        console.log('Teacher:', idTeacher);
        console.log('Reservation:', id);
        console.log(reservations.data);
        // Comprobar si el idTeacher ya está asignado antes de proceder
        for (let i = 0; i < reservations.data.length; i++) {
            if (idTeacher != null && id == reservations.data[i].id) {
                console.log('Actualizando....');
                const dataReservation = reservations.data[i];
                dataReservation.idTeacher = idTeacher; // Asignar solo el idTeacher
                handleUpdate(dataReservation); // Solo actualiza si es necesario
                return 0;
            }
        }
    };
      

    const ROL = rol.data?.rol;
    const canManageResources = user && (ROL === 'admin' || ROL === 'encargado');
    const canReservate = user && (ROL === 'docente');

    // Calcular los recursos a mostrar en la página actual
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = resources.slice(indexOfFirstResource, indexOfLastResource);

    console.log('Recursos:', resources);

    // Filtrar las reservas para mostrar solo las del día de hoy y las futuras o las pasadas
    const today = new Date();
    const filteredFutureReservations = filteredReservations.filter(reservation => new Date(reservation.fecha) >= today);
    const filteredPastReservations = filteredReservations.filter(reservation => new Date(reservation.fecha) < today);

    // Calcular las reservas a mostrar en la página actual
    const sortedReservations = sortReservations(showPastReservations ? filteredPastReservations : filteredFutureReservations, sortCriteria);
    const indexOfLastReservation = currentReservationPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = sortedReservations.slice(indexOfFirstReservation, indexOfLastReservation);

        // Calcular los tiempos a mostrar en la página actual
    const sortedTimes = sortReservations(showPastReservations ? filteredPastReservations : filteredFutureReservations, sortCriteria);
    const indexOfLastTime = currentReservationPage * reservationsPerPage;
    const indexOfFirstTime = indexOfLastTime - reservationsPerPage;
    const currentTimes = sortedTimes.slice(indexOfFirstTime, indexOfLastTime);

    // Funciones para avanzar y retroceder páginas de reservas
    const nextReservationPage = () => {
        if (currentReservationPage < Math.ceil((showPastReservations ? filteredPastReservations : filteredFutureReservations).length / reservationsPerPage)) {
            setCurrentReservationPage(currentReservationPage + 1);
        }
    };

    const prevReservationPage = () => {
        if (currentReservationPage > 1) {
            setCurrentReservationPage(currentReservationPage - 1);
        }
    };

    // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de reservas por página

    // Cálculo de los datos paginados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reservationsData
    .filter(item => item.idTeacher === null)
    .slice(indexOfFirstItem, indexOfLastItem);



    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const goToNextPage = () => {
        const maxPages = Math.ceil(
            reservationsData.filter(item => item.idTeacher === null).length / itemsPerPage
        );
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1);
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

    // {`(${ROL})`}

    return (
        <div className="main-container">
            <div className="reservation-container">
                <h1>Administración de recursos</h1>
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
                                        <button
                                            disabled={element.estado == "RESERVADO"}
                                            onClick={() => handleGetClick2(element)}
                                        >
                                            Ver Horarios
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
            {isReservationPopupOpen && (
                <div className="popup-reserva">
                    <div className="popup-content">
                        <button className="close-button" onClick={closeReservationPopup}>
                            ✖
                        </button>
                        <h2>Reservas disponibles</h2>
                        {reservationsData.length === 0 ? (
                            <p>No hay reservas disponibles para este recurso.</p>
                        ) : (
                            <table className="reservation-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Hora Inicio</th>
                                        <th>Hora Fin</th>
                                        <th>Acción</th> {/* Columna adicional */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.fecha}</td>
                                            <td>{item.horaInicio}</td>
                                            <td>{item.horaFin}</td>
                                            <td>
                                                <button onClick={() => handleAssignTeacher(item.id)}>
                                                    Reservar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className="pagination">
                            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                            </button>
                            <button
                                onClick={goToNextPage}
                                disabled={
                                    currentPage === Math.ceil(
                                        reservationsData.filter(item => item.idTeacher === null).length / itemsPerPage
                                    )
                                }
                            >
                                Siguiente <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewReservationId && (
            <div className="reservation-details">
            <buttonClose onClick={() => setViewReservationId(null)} className="close-button">
                ✖
            </buttonClose>
                <div className="reservation-actions">
                    <button onClick={() => setShowPastReservations(!showPastReservations)}>
                        {showPastReservations ? 'Mostrando Reservas Pasadas' : 'Mostrando Reservas Disponibles'}
                    </button>
                </div>
                {currentReservations.length === 0 ? (
                    <p>No hay reservas para este recurso.</p>
                ) : (
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>
                                    <button2 onClick={() => handleSort('horaInicio')}>
                                        Hora Inicio {sortCriteria.field === 'horaInicio' && (sortCriteria.direction === 'asc' ? '↑' : '↓')}
                                    </button2>
                                </th>
                                <th>Hora Fin</th>
                                <th>
                                    <button2 onClick={() => handleSort('fecha')}>
                                        Fecha {sortCriteria.field === 'fecha' && (sortCriteria.direction === 'asc' ? '↑' : '↓')}
                                    </button2>
                                </th>
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
                                    <td>{reservation.idTeacher === null ? "No solicitado" : reservation.idTeacher}</td>
                                    <td>
                                        <button onClick={() => handleDeleteReserva(reservation)}>
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
                    <buttonPag onClick={nextReservationPage} disabled={currentReservationPage === Math.ceil((showPastReservations ? filteredPastReservations : filteredFutureReservations).length / reservationsPerPage)}>
                        Siguiente <FontAwesomeIcon icon={faArrowRight} />
                    </buttonPag>
                </div>
            </div>
        )}
        </div>
    );
}

export default Reservation;