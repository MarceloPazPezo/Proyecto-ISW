import { deleteTimeBlock } from '@services/timeblock.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteTimeBlock = (fetchTimeBlocks, setDataTimeBlock) => {
    const handleDelete = async (dataTimeBlock) => {
        if (dataTimeBlock.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteTimeBlock(dataTimeBlock[0].id);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','El bloque de tiempo ha sido eliminado correctamente.');
                await fetchTimeBlocks();
                setDataTimeBlock([]);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar el bloquue de tiempo:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el bloque de tiempo.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteTimeBlock;