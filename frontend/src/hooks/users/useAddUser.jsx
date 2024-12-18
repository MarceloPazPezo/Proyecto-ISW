import { useState, useEffect } from 'react';

const useAddUser = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorNombreCompleto, setErrorNombreCompleto] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorRut, setErrorRut] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');
    const [errorRol, setErrorRol] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [inputData, setInputData] = useState({ email: '', rut: '' });

    useEffect(() => {
        if (inputData.nombreCompleto) setErrorNombreCompleto('');
        if (inputData.email) setErrorEmail('');
        if (inputData.rut) setErrorRut('');
        if (inputData.telefono) setErrorTelefono('');
        if (inputData.rol) setErrorRol('');
        if (inputData.password) setErrorPassword('');
    }, [inputData.nombreCompleto, inputData.email, inputData.rut, inputData.telefono, inputData.rol, inputData.password]);

    const errorData = (dataMessage) => {
        if (typeof dataMessage === "object" && dataMessage.dataInfo) {
            switch (dataMessage.dataInfo) {
                case "nombreCompleto":
                    setErrorNombreCompleto(dataMessage.message);
                    break;
                case "email":
                    setErrorEmail(dataMessage.message);
                    break;
                case "rut":
                    setErrorRut(dataMessage.message);
                    break;
                case "telefono":
                    setErrorTelefono(dataMessage.message);
                    break;
                case "rol":
                    setErrorRol(dataMessage.message);
                    break;
                case "password":
                    setErrorPassword(dataMessage.message);
                    break;
                default:
                    console.warn("Campo desconocido:", dataMessage.dataInfo);
            }
        } else if (typeof dataMessage === "string") {
            if (/nombreCompleto/.test(dataMessage)) setErrorNombreCompleto(dataMessage);
            if (/email/.test(dataMessage)) setErrorEmail(dataMessage);
            if (/rut/.test(dataMessage)) setErrorRut(dataMessage);
            if (/telefono/.test(dataMessage)) setErrorTelefono(dataMessage);
            if (/rol/.test(dataMessage)) setErrorRol(dataMessage);
            if (/password/.test(dataMessage)) setErrorPassword(dataMessage);
        } else {
            console.error("Formato de dataMessage no reconocido:", dataMessage);
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
        errorNombreCompleto,
        errorEmail,
        errorRut,
        errorTelefono,
        errorRol,
        errorPassword,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddUserClick
    };
};

export default useAddUser;