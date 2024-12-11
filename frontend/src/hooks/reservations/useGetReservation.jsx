import { useState, useEffect } from 'react';
import { getReservation } from '../../services/reservation.service.js';

const useGetReservation = (id) => {
    const [reservation, setReservation] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Para manejar errores, si es necesario

    useEffect(() => {
        // Solo ejecuta fetchReservation si el ID es válido

        console.log("IDUSE:", id);

        if (!id) return;

        const fetchReservation = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("Obteniendo reservas para el ID:", id);
                const response = await getReservation(id);
                console.log("Respuesta:", response);
                setReservation(response);
            } catch (err) {
                console.error("Error al obtener reservas:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, []); // Se asegura de ejecutar el efecto solo cuando `id` cambia

    return { reservation, loading, error };
};

export default useGetReservation;
