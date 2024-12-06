import { useState, useEffect } from 'react';

const useAddSubject = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [errorNombre, setErrorNombre] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
    }, [inputData.nombre]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            console.log(dataMessage.message);
            setErrorNombre(dataMessage.message);
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
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddSubjectClick
    };
};

export default useAddSubject;