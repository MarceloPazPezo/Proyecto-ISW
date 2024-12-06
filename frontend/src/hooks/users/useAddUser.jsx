import { useState, useEffect } from 'react';

const useAddUser = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorEmail, setErrorEmail] = useState('');
    const [errorRut, setErrorRut] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');
    const [inputData, setInputData] = useState({ email: '', rut: '' });

    useEffect(() => {
        if (inputData.email) setErrorEmail('');
        if (inputData.rut) setErrorRut('');
        if (inputData.telefono) setErrorTelefono('');
    }, [inputData.email, inputData.rut, inputData.telefono]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'email') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'rut') {
            setErrorRut(dataMessage.message);
        } else if (dataMessage.dataInfo === 'telefono') {
            setErrorTelefono(dataMessage.message);
        }
    };

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
        errorTelefono,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddUserClick
    };
};

export default useAddUser;