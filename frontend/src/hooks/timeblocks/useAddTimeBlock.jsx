import { useState, useEffect } from 'react';

const useAddTimeBlock = () => {
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [errorDocente, setErrorDocente] = useState('');
    const [errorAsignatura, setErrorAsignatura] = useState('');
    const [errorCurso, setErrorCurso] = useState('');
    const [errorHoraInicio, setErrorHoraInicio] = useState('');
    const [errorHoraTermino, setErrorHoraTermino] = useState('');
    const [errorDiaSemana, setErrorDiaSemana] = useState('');
    const [inputData, setInputData] = useState({ docente: '', asignatura: '', curso: '', horaInicio: '', horaTermino: '', diaSemana: '' });

    useEffect(() => {
        if (inputData.docente) setErrorDocente('');
        if (inputData.asignatura) setErrorAsignatura('');
        if (inputData.curso) setErrorCurso('');
        if (inputData.horaInicio) setErrorHoraInicio('');
        if (inputData.horaTermino) setErrorHoraTermino('');
        if (inputData.diaSemana) setErrorDiaSemana('');
    }, [inputData.docente, inputData.asignatura, inputData.curso, inputData.horaInicio, inputData.horaTermino, inputData.diaSemana]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'docente') {
            setErrorDocente(dataMessage.message);
        } else if (dataMessage.dataInfo === 'asignatura') {
            setErrorAsignatura(dataMessage.message);
        } else if (dataMessage.dataInfo === 'curso') {
            setErrorCurso(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaInicio') {
            setErrorHoraInicio(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaTermino') {
            setErrorHoraTermino(dataMessage.message);
        } else if (dataMessage.dataInfo === 'diaSemana') {
            setErrorDiaSemana(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddTimeBlockClick = () => {
        setIsPopupAddOpen(true);
    };

    return {
        errorDocente,
        errorAsignatura,
        errorCurso,
        errorHoraInicio,
        errorHoraTermino,
        errorDiaSemana,
        inputData,
        errorData,
        handleInputChange,
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddTimeBlockClick
    };
}

export default useAddTimeBlock;
