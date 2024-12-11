import { useState, useEffect } from 'react';

const useAddCourse = () => {
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

    const handleAddCourseClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorNombre,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddCourseClick
    };
};

export default useAddCourse;