import { deleteReservation } from '../../services/reservation.service.js'
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '../../helpers/sweetAlert.js'

const useDeleteReservation = (fetchReservations) => {
    const handleDeleteReserva = async (dataReservation) => {
        console.log("DataReservation: ", dataReservation);
        if (dataReservation.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    console.log("Reserva->" + dataReservation[0].id);
                    const response = await deleteReservation(dataReservation[0].id); //FIXME: dataReservation[0].id
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La reserva ha sido eliminada correctamente.');
                    await fetchReservations();
                    // setDataReservation([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la reserva.');
            }
        }else{
            showErrorAlert('Error', 'No se ha seleccionado ninguna reserva.');
        }
    };

    return {
        handleDeleteReserva
    };
}

export default useDeleteReservation;