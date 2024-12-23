import { useState } from 'react';
import { updateClassroom } from '@services/classroom.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateClassroom } from '@helpers/formatData.js';

const useEditClassroom = (setClassrooms) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataClassroom, setDataClassroom] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataClassroom.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedClassroomData) => {
        if (updatedClassroomData) {
            try {
                const updatedClassroom = await updateClassroom(updatedClassroomData, dataClassroom[0].nombre);
                showSuccessAlert('¡Actualizado!','El aula ha sido actualizada correctamente.');
                setIsPopupEditOpen(false);
                const formattedClassroom = formatPostUpdateClassroom(updatedClassroom);

                setClassrooms(prevClassrooms => prevClassrooms.map(classroom => {
                    return classroom.nombre === formattedClassroom.nombre ? formattedClassroom : classroom;
                }));
                
                setDataClassroom([]);
            } catch (error) {
                console.error('Error al actualizar el aula:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el aula.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataClassroom,
        setDataClassroom
    };
};

export default useEditClassroom;