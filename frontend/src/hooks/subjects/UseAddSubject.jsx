import { useState, useEffect } from 'react';

const useAddSubject = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [errorNombre, setErrorNombre] = useState('');
    const [errorDepartamento, setErrorDepartamento] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''}, { departamento: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.departamento) setErrorDepartamento('');
    }, [inputData.nombre, inputData.departamento]);

    const errorData = (dataMessage) => {
        if (typeof dataMessage === "object" && dataMessage.dataInfo) {
            switch (dataMessage.dataInfo) {
                case "nombre":
                    setErrorNombre(dataMessage.message);
                    break;
                case "departamento":
                    setErrorDepartamento(dataMessage.message);
                    break;
                default:
                    console.warn("Campo desconocido:", dataMessage.dataInfo);
            }
        } else if (typeof dataMessage === "string") {
            if (/nombre/.test(dataMessage)) setErrorNombre(dataMessage);
            if (/departamento/.test(dataMessage)) setErrorDepartamento(dataMessage);
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

    const handleAddSubjectClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorNombre,
        errorDepartamento,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddSubjectClick
    };
};

export default useAddSubject;