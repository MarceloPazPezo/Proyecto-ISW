import { useState, useEffect } from 'react';
import { addTeacher } from '../../services/user.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useAddTeacher = (setTeachers) => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorEmail, setErrorEmail] = useState('');
    const [errorRut, setErrorRut] = useState('');
    const [inputData, setInputData] = useState({ email: '', rut: '' });

    useEffect(() => {
        if (inputData.email) setErrorEmail('');
        if (inputData.rut) setErrorRut('');
    }, [inputData.email, inputData.rut]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'email') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'rut') {
            setErrorRut(dataMessage.message);
        }
    };

    const handleAdd = async (addedTeacherData) => {
        if (addedTeacherData) {
            try {
                const addedTeacher = await addTeacher(addedTeacherData);
                showSuccessAlert('¡Registrado!', 'Docente registrado exitosamente.');
                setIsPopupAddOpen(false);

                const formattedUser = formatPostUpdate(addedTeacher);

                setTeachers(prevUsers => [...prevUsers, formattedUser]);
            } catch (error) {
                console.error("Error al registrar el docente: ", error);
                showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
            }
        }
    }

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddTeacherClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorEmail,
        errorRut,
        inputData,
        errorData,
        handleInputChange,
        handleAdd,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddTeacherClick
    };
};

export default useAddTeacher;