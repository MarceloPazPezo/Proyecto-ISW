import { useState, useEffect } from 'react';
import { getReservation } from '../../services/reservation.service.js';


const useGetReservation = (id) => {
    console.log("IDGR: ", id);
    const [reservation, setReservation] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchReservation = async () => {
        try {
            const response = await getReservation(id);
            console.log("Respuesta: ", response);
            setReservation(response);
            setLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchReservation();
    }, []);

    return { reservation, loading };
}
export default useGetReservation;