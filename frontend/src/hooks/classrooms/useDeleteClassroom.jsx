import { deleteClassroom } from '@services/classroom.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteClassroom = (fetchClassrooms, setDataClassroom) => {
    const handleDelete = async (dataClassroom) => {
        if (dataClassroom.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteClassroom(dataClassroom[0].nombre);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','El aula ha sido eliminado correctamente.');
                await fetchClassrooms();
                setDataClassroom([]);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar el aula:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el usuario.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteClassroom;