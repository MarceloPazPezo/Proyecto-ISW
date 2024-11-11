import { useState, useEffect } from 'react';

const useAddTimeBlock = () => {
    const [errorHoraInicio, setErrorHoraInicio] = useState('');
    const [errorHoraTermino, setErrorHoraTermino] = useState('');
    const [errorFecha, setErrorFecha] = useState('');
    const [inputData, setInputData] = useState({ horaInicio: '', horaTermino: '', fecha: '' });

    useEffect(() => {
        if (inputData.horaInicio) setErrorHoraInicio('');
        if (inputData.horaTermino) setErrorHoraTermino('');
        if (inputData.fecha) setErrorFecha('');
    }, [inputData.horaInicio, inputData.horaTermino, inputData.fecha]); 

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'horaInicio') {
            setErrorHoraInicio(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaTermino') {
            setErrorHoraTermino(dataMessage.message);
        } else if (dataMessage.dataInfo === 'fecha') {
            setErrorFecha(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorHoraInicio,
        errorHoraTermino,
        errorFecha,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useAddTimeBlock;