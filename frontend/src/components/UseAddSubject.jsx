import { useState, useEffect } from 'react';
import { addSubject } from '@services/subject.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddSubject = (setSubjects) => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [errorNombre, setErrorNombre] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
    }, [inputData.nombre]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.nombre);
        }
    };

    const handleAdd = async (addedSubjectData) => {
        try {
            const addedSubject = await addSubject(addedSubjectData);

            if (addedSubject.status === 'Success') {
                showSuccessAlert('¡Registrada!','Aula registrada exitosamente.');
                setIsPopupAddOpen(false);
                setSubjects(prevSubjects => [...prevSubjects, addedSubject]);
            } else if (addedSubject.status === 'Client error') {
                console.log(addedSubject);
                showSuccessAlert('pepito!','Aula registrada exitosamente.');
                setErrorNombre('El nombre de la asignatura ya está en uso.');
                return errorNombre;
                // setIsPopupAddOpen(true);
            }

        } catch (error) {
            console.error("Error al registrar un aula: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrar.');
        }
    }

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddSubjectClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorNombre,
        inputData,
        errorData,
        handleInputChange,
        handleAdd,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddSubjectClick
    };
};

export default useAddSubject;