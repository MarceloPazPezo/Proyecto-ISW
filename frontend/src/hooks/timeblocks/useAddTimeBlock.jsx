import { useState, useEffect } from 'react';

const useAddTimeBlock = () => {
    const [errorDocente, setErrorDocente] = useState('');
    const [inputDataDocente, setInputDataDocente] = useState({ docente: '' });
    const [errorAsignatura, setErrorAsignatura] = useState('');
    const [inputDataAsignatura, setInputDataAsignatura] = useState({ docente: '' });
    const [errorHoraInicio, setErrorHoraInicio] = useState('');
    const [inputDataHoraInicio, setInputDataHoraInicio] = useState({ horaInicio: '' });
    const [errorHoraTermino, setErrorHoraTermino] = useState('');
    const [inputDataHoraTermino, setInputDataHoraTermino] = useState({ horaTermino: '' });
    const [errorFecha, setErrorFecha] = useState('');
    const [inputDataFecha, setInputDataFecha] = useState({ fecha: '' });

    useEffect(() => {
        if (inputDataDocente.docente) setErrorDocente('');
        if (inputDataAsignatura.asignatura) setErrorAsignatura('');
        if (inputDataHoraInicio.horaInicio) setErrorHoraInicio('');
        if (inputDataHoraTermino.horaTermino) setErrorHoraTermino('');
        if (inputDataFecha.fecha) setErrorFecha('');
    }, [inputDataDocente, inputDataAsignatura, inputDataHoraInicio.horaInicio, inputDataHoraTermino.horaTermino, inputDataFecha.fecha]);

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
        if (field === 'docente') {
            setInputDataDocente(prevState => ({
                ...prevState,
                docente: value
            }));    
        } else if (field === 'asignatura') {
            setInputDataAsignatura(prevState => ({
                ...prevState,
                asignatura: value
            }));
        } else if (field === 'horaInicio') {
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
        errorDocente,
        inputDataDocente,
        errorAsignatura,
        inputDataAsignatura,
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
