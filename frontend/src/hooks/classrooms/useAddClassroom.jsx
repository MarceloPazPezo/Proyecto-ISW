import { useState, useEffect } from 'react';

const useAddClassroom = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorNombre, setErrorNombre] = useState('');
    const [errorCapacidad, setErrorCapacidad] = useState('');
    const [inputData, setInputData] = useState({ nombre: '' }, { capacidad: '' });

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.capacidad) setErrorCapacidad('');
    }, [inputData.nombre, inputData.capacidad]);

    const errorData = (dataMessage) => {
        if (typeof dataMessage === "object" && dataMessage.dataInfo) {
            switch (dataMessage.dataInfo) {
                case "nombre":
                    setErrorNombre(dataMessage.message);
                    break;
                case "capacidad":
                    setErrorCapacidad(dataMessage.message);
                    break;
                default:
                    console.warn("Campo desconocido:", dataMessage.dataInfo);
            }
        } else if (typeof dataMessage === "string") {
            if (/nombre/.test(dataMessage)) setErrorNombre(dataMessage);
            if (/capacidad/.test(dataMessage)) setErrorCapacidad(dataMessage);
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