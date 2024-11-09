import { useState, useEffect } from 'react';
import '@styles/reservation.css';
import { getUserRol } from '../services/user.service.js';
import PopupAddResource from '../components/PopupAddResource.jsx';
import useDeleteResource from '../hooks/resource/useDeleteResource.jsx';
import useGetResources from '../hooks/resource/useGetResources.jsx';

const Reservation = () => {
    const [user, setUser] = useState(null);
    const [rol, setRol] = useState('');
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const { resources, fetchResources, setDataResources } = useGetResources();
    const { handleDelete } = useDeleteResource(fetchResources, setDataResources);

    const handleAddResourceClick = () => {
        setIsPopupAddOpen(true);
    };

    const handleDeleteClick = async (id) => {
        await handleDelete(id);
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

    return (
        <div className="main-container">
            <div className="reservation-container">
                <h1>Reservas de Espacios {`(${ROL})`}</h1>
                {canManageResources && (
                    <button onClick={handleAddResourceClick}>Crear Reserva</button>
                )}
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(resources) && resources.map((element) => (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.nombre}</td>
                                <td>{element.estado}</td>
                                <td>
                                    <button disabled={element.estado === "reservado" || !canManageResources}>
                                        Reservar
                                    </button>
                                    {canManageResources && (
                                        <>
                                            <button2>Editar</button2>
                                            <button2 onClick={() => handleDeleteClick(element.id)}>Eliminar</button2>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PopupAddResource show={isPopupAddOpen} setShow={setIsPopupAddOpen} />
        </div>
    );
}

export default Reservation;
