import { useState, useEffect } from 'react';

const useAddClassroom = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorNombre, setErrorNombre] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
    }, [inputData.nombre]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.message);
        }
    };

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
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddClassroomClick
    };
};

export default useAddClassroom;