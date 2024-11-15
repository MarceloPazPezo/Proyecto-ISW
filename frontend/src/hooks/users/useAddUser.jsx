import { useState, useEffect } from 'react';
import { addUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useAddUser = (setUsers) => {
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

    const handleAdd = async (addedUserData) => {
        if (addedUserData) {
            try {
                const addedUser = await addUser(addedUserData);
                showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
                setIsPopupAddOpen(false);

                const formattedUser = formatPostUpdate(addedUser);

                setUsers(prevUsers => [...prevUsers, formattedUser]);
            } catch (error) {
                console.error("Error al registrar el usuario: ", error);
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


    const handleAddUserClick = () => {
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
        handleAddUserClick
    };
};

export default useAddUser;