import { useState } from "react";
import { updateReservation } from "../../services/reservation.service";
import { showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useEditReservation = (setReservations) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataReservation, setDataReservation] = useState([]);

    const handleClickUpdate = () => {
        if (dataReservation.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedReservationData) => {
        // console.log("DataReservationSSSSSSSSSS: ", updatedReservationData);
        if (updatedReservationData) {
            try {
                const updatedReservation = await updateReservation(updatedReservationData); //FIXME: dataReservation[0].id
                showSuccessAlert('¡Actualizado!','La reserva ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                setReservations(prevReservations => prevReservations.map(reservation => reservation.id === updatedReservation.id ? updatedReservation : reservation));
                setDataReservation([]);
            } catch (error) {
                console.error('Error al actualizar la reserva:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar la reserva.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataReservation,
        setDataReservation
    };
}

export default useEditReservation;