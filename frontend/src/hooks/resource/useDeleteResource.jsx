import { deleteResource } from '../../services/resource.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteResource = (fetchResources) => {
    const handleDeleteRecurso = async (resourceID) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                // console.log("Recurso->" + resourceID);
                const response = await deleteResource(resourceID);
                // console.log("Resultado->" + response.status);
                if (response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }else if (response.status === 'Success') {
                showSuccessAlert('¡Eliminado!', 'El recurso ha sido eliminado correctamente.');
                }
                await fetchResources();
                // setDataResources();
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
        } catch (error) {
            console.error('Error al eliminar el recurso:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el recurso.');
        }
    };

    return { handleDeleteRecurso };
};

export default useDeleteResource;
