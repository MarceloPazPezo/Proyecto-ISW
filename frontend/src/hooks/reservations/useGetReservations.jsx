import { useState, useEffect } from 'react';
import { getReservations } from '../../services/reservation.service.js';

const useGetReservations = () => {
    console.log("useGetReservations");
    const [reservations, setReservations] = useState({ status: '', message: '', data: [] });
    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            console.log("Reservas:", response);
            if (response && response.data) {
                setReservations(response); // Asegúrate de que se guarda la estructura completa
            }
            setLoading(false);
        } catch (error) {
            console.error("Error: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return { reservations, fetchReservations, loading };
};

export default useGetReservations;
