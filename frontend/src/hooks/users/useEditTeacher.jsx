import { useState } from 'react';
import { updateUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditTeacher = (setTeachers) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataTeacher, setDataTeacher] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataTeacher.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedTeacherData) => {
        if (updatedTeacherData) {
            try {
            const updatedTeacher = await updateUser(updatedTeacherData, dataTeacher[0].rut);
            showSuccessAlert('¡Actualizado!','El docente ha sido actualizado correctamente.');
            setIsPopupEditOpen(false);
            const formattedTeacher = formatPostUpdate(updatedTeacher);

            setTeachers(prevTeachers => prevTeachers.map(teacher => {
                console.log("Docente actual:", teacher);
                if (teacher.id === formattedTeacher.id) {
                    console.log("Reemplazando con:", formattedTeacher);
                }
                return teacher.email === formattedTeacher.email ? formattedTeacher : teacher;
            }));
            

            setDataTeacher([]);
            } catch (error) {
                console.error('Error al actualizar el docente:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el docente.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataTeacher,
        setDataTeacher
    };
};

export default useEditTeacher;