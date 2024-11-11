import { useState, useEffect } from 'react';
import { getReservations } from '../../services/reservation.service.js';

const useGetReservations = () => {
    console.log("useGetReservations");
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            console.log("Reservas:", response);
            setReservations(response);
            setLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return { reservations, fetchReservations, loading };
} 
export default useGetReservations;
