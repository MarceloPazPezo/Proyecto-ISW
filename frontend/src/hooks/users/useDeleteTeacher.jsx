import { deleteUser } from '@services/user.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteTeacher = (fetchTeachers, setDataTeacher) => {
    const handleDelete = async (dataTeacher) => {
        if (dataTeacher.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteUser(dataTeacher[0].rut);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','El docente ha sido eliminado correctamente.');
                await fetchTeachers();
                setDataTeacher([]);
                window.location.reload();
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar el docente:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el docente.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteTeacher;