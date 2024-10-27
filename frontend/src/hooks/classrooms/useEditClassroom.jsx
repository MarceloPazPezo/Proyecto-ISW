import { useState } from 'react';
import { updateClassroom } from '@services/classroom.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateClassroom } from '@helpers/formatData.js';

const useEditClassroom = (setClassrooms) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataClassroom, setDataClassroom] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataClassroom.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedClassroomData) => {
        if (updatedClassroomData) {
            try {
                const updatedClassroom = await updateClassroom(updatedClassroomData, dataClassroom[0].nombre);
                showSuccessAlert('¡Actualizado!','El usuario ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedClassroom = formatPostUpdateClassroom(updatedClassroom);

                setClassrooms(prevClassrooms => prevClassrooms.map(classroom => {
                    console.log("Aula actual:", classroom);
                    if (classroom.nombre === formattedClassroom.nombre) {
                        console.log("Reemplazando con:", formattedClassroom);
                    }
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
        isPopupOpen,
        setIsPopupOpen,
        dataClassroom,
        setDataClassroom
    };
};

export default useEditClassroom;