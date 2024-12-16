import { useState, useEffect } from 'react';

const useAddTimeBlock = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [errorDocente, setErrorDocente] = useState('');
    const [inputDataDocente, setInputDataDocente] = useState({ docente: '' });
    const [errorAsignatura, setErrorAsignatura] = useState('');
    const [inputDataAsignatura, setInputDataAsignatura] = useState({ asignatura: '' });
    const [errorCurso, setErrorCurso] = useState('');
    const [inputDataCurso, setInputDataCurso] = useState({ curso: '' });
    const [errorHoraInicio, setErrorHoraInicio] = useState('');
    const [inputDataHoraInicio, setInputDataHoraInicio] = useState({ horaInicio: '' });
    const [errorHoraTermino, setErrorHoraTermino] = useState('');
    const [inputDataHoraTermino, setInputDataHoraTermino] = useState({ horaTermino: '' });
    const [errorDiaSemana, setErrorDiaSemana] = useState('');
    const [inputDataDiaSemana, setInputDataDiaSemana] = useState({ diaSemana: '' });

    useEffect(() => {
        if (inputDataDocente.docente) setErrorDocente('');
        if (inputDataAsignatura.asignatura) setErrorAsignatura('');
        if (inputDataCurso.curso) setErrorCurso('');
        if (inputDataHoraInicio.horaInicio) setErrorHoraInicio('');
        if (inputDataHoraTermino.horaTermino) setErrorHoraTermino('');
        if (inputDataDiaSemana.diaSemana) setErrorDiaSemana('');
    }, [inputDataDocente, inputDataAsignatura, inputDataCurso, inputDataHoraInicio.horaInicio, inputDataHoraTermino.horaTermino, inputDataDiaSemana.diaSemana]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'horaInicio') {
            setErrorHoraInicio(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaTermino') {
            setErrorHoraTermino(dataMessage.message);
        } else if (dataMessage.dataInfo === 'diaSemana') {
            setErrorDiaSemana(dataMessage.message);
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
        } else if (field === 'curso') {
            setInputDataCurso(prevState => ({
                ...prevState,
                curso: value
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
        } else if (field === 'diaSemana') {
            setInputDataDiaSemana(prevState => ({
                ...prevState,
                diaSemana: value
            }));
        }
    };

    const handleAddTimeBlockClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorDocente,
        inputDataDocente,
        errorAsignatura,
        inputDataAsignatura,
        errorCurso,
        inputDataCurso,
        errorHoraInicio,
        inputDataHoraInicio,
        errorHoraTermino,
        inputDataHoraTermino,
        errorDiaSemana,
        inputDataDiaSemana,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddTimeBlockClick
    };
};

export default useAddTimeBlock;
