import { deleteSubject } from '@services/subject.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteSubject = (fetchSubjects, setDataSubject) => {
    const handleDelete = async (dataSubject) => {
        if (dataSubject.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteSubject(dataSubject[0].nombre.toLowerCase());
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminada!','La asignatura ha sido eliminada correctamente.');
                await fetchSubjects();
                setDataSubject([]);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar la asignatura:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el usuario.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteSubject;