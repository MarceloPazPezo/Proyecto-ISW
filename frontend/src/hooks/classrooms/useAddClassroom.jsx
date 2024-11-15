import { useState, useEffect } from 'react';
import { addClassroom } from '@services/classroom.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddClassroom = (setClassrooms) => {
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

    const handleAdd = async (addedClassroomData) => {
        try {
            const addedClassroom = await addClassroom(addedClassroomData);

            showSuccessAlert('¡Registrada!','Aula registrada exitosamente.');
            setIsPopupAddOpen(false);

            setClassrooms(prevClassrooms => [...prevClassrooms, addedClassroom]);
        } catch (error) {
            console.error("Error al registrar un aula: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    }

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddClassroomClick = () => {
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
        handleAddClassroomClick
    };
};

export default useAddClassroom;