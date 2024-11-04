import { useState, useEffect } from 'react';

const useAddClassroom = () => {
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

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorNombre,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useAddClassroom;