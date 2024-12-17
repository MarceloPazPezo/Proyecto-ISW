import { useState, useEffect } from 'react';

const useAddCourse = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

    const [errorNombre, setErrorNombre] = useState('');
    const [errorIdBossteacher, setErrorIdBossteacher] = useState('');
    const [errorIdClassroom, setErrorIdClassroom] = useState('');
    const [errorCantidadAlumnos, setErrorCantidadAlumnos] = useState('');
    const [inputData, setInputData] = useState({ nombre: ''}, { idBossteacher: ''}, { idClassroom: ''}, { cantidadAlumnos: ''});

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.idBossteacher) setErrorIdBossteacher('');
        if (inputData.idClassroom) setErrorIdClassroom('');
        if (inputData.cantidadAlumnos) setErrorCantidadAlumnos('');
    }, [inputData.nombre, inputData.idBossteacher, inputData.idClassroom, inputData.cantidadAlumnos]);

    const errorData = (dataMessage) => {
        if (typeof dataMessage === "object" && dataMessage.dataInfo) {
            switch (dataMessage.dataInfo) {
                case "nombre":
                    setErrorNombre(dataMessage.message);
                    break;
                case "idBossteacher":
                    setErrorIdBossteacher(dataMessage.message);
                    break;
                case "idClassroom":
                    setErrorIdClassroom(dataMessage.message);
                    break;
                case "cantidadAlumnos":
                    setErrorCantidadAlumnos(dataMessage.message);
                    break;
                default:
                    console.warn("Campo desconocido:", dataMessage.dataInfo);
            }
        } else if (typeof dataMessage === "string") {
            if (/nombre/.test(dataMessage)) setErrorNombre(dataMessage);
            if (/idBossteacher/.test(dataMessage)) setErrorIdBossteacher(dataMessage);
            if (/idClassroom/.test(dataMessage)) setErrorIdClassroom(dataMessage);
            if (/cantidadAlumnos/.test(dataMessage)) setErrorCantidadAlumnos(dataMessage);
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


    const handleAddCourseClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorNombre,
        errorIdBossteacher,
        errorIdClassroom,
        errorCantidadAlumnos,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddCourseClick
    };
};

export default useAddCourse;