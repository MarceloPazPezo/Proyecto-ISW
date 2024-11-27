import { useState, useEffect } from 'react';

const useAddTimeBlock = () => {
    const [errorHoraInicio, setErrorHoraInicio] = useState('');
    const [inputDataHoraInicio, setInputDataHoraInicio] = useState({ horaInicio: '' });
    const [errorHoraTermino, setErrorHoraTermino] = useState('');
    const [inputDataHoraTermino, setInputDataHoraTermino] = useState({ horaTermino: '' });
    const [errorFecha, setErrorFecha] = useState('');
    const [inputDataFecha, setInputDataFecha] = useState({ fecha: '' });

    useEffect(() => {
        if (inputDataHoraInicio.horaInicio) setErrorHoraInicio('');
        if (inputDataHoraTermino.horaTermino) setErrorHoraTermino('');
        if (inputDataFecha.fecha) setErrorFecha('');
    }, [inputDataHoraInicio.horaInicio, inputDataHoraTermino.horaTermino, inputDataFecha.fecha]);

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
        if (field === 'horaInicio') {
            setInputDataHoraInicio(prevState => ({
                ...prevState,
                horaInicio: value
            }));
        } else if (field === 'horaTermino') {
            setInputDataHoraTermino(prevState => ({
                ...prevState,
                horaTermino: value
            }));
        } else if (field === 'fecha') {
            setInputDataFecha(prevState => ({
                ...prevState,
                fecha: value
            }));
        }
    };

    return {
        errorHoraInicio,
        inputDataHoraInicio,
        errorHoraTermino,
        inputDataHoraTermino,
        errorFecha,
        inputDataFecha,
        errorData,
        handleInputChange,
    };
};

export default useAddTimeBlock;
