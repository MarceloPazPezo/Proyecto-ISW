import { useState } from 'react';
import { updateSubject } from '@services/subject.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateSubject } from '@helpers/formatData.js';
import { convertirMinusculas } from '@helpers/formatData.js';
import { quitarAcentos } from '../../helpers/formatData';

const useEditSubject = (setSubjects) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataSubject, setDataSubject] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataSubject.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedSubjectData) => {
        if (updatedSubjectData) {
            try {
                console.log(convertirMinusculas(updatedSubjectData));
                console.log(quitarAcentos(dataSubject[0].nombre));
                const updatedSubject = await updateSubject(convertirMinusculas(updatedSubjectData), quitarAcentos(dataSubject[0].nombre));
                showSuccessAlert('¡Actualizada!','La asignatura ha sido actualizada correctamente.');
                setIsPopupEditOpen(false);
                const formattedSubject = formatPostUpdateSubject(updatedSubject);

                setSubjects(prevSubjects => prevSubjects.map(subject => {
                    return subject.nombre === formattedSubject.nombre ? formattedSubject : subject;
                }));
                
                setDataSubject([]);
            } catch (error) {
                console.error('Error al actualizar la asignatura:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar la asignatura.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataSubject,
        setDataSubject
    };
};

export default useEditSubject;