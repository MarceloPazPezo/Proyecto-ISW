import { deleteCourse } from '@services/course.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteCourse = (fetchCourse, setDataCourse) => {
    const handleDelete = async (dataCourse) => {
        if (dataCourse.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteCourse(dataCourse[0].nombre.toLowerCase());
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminada!','El curso ha sido eliminado correctamente.');
                
                await fetchCourse();
                
                setDataCourse([]);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar el curso:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el curso.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteCourse;