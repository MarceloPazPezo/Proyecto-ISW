import { useState, useEffect } from 'react';

const useAddClassroom = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorNombre, setErrorNombre] = useState('');
    const [errorCapacidad, setErrorCapacidad] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.capacidad) setErrorCapacidad('');
    }, [inputData.nombre, inputData.capacidad]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.message);
        }
        if (dataMessage.dataInfo === 'capacidad') {
            setErrorCapacidad(dataMessage.message);
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
        errorCapacidad,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddClassroomClick
    };
};

export default useAddClassroom;