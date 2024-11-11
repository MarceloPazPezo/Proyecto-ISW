import { useState, useEffect } from 'react';

const useAddReservation = () => {
    const [errorFecha, setErrorFecha] = useState('');
    const [errorHoraIngreso, setErrorHoraIngreso] = useState('');
    const [errorHoraSalida, setErrorHoraSalida] = useState('');
    const [errorIdRecurso, setErrorIdRecurso] = useState('');

    const [inputData, setInputData] = useState({ fecha: '', horaIngreso: '', horaSalida: '' });

    useEffect(() => {
        if (inputData.fecha) setErrorFecha('');
        if (inputData.horaIngreso) setErrorHoraIngreso('');
        if (inputData.horaSalida) setErrorHoraSalida('');
        if (inputData.idRecurso) setErrorIdRecurso('');
    }, [inputData.fecha, inputData.horaIngreso, inputData.horaSalida, inputData.idRecurso]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'fecha') {
            setErrorFecha(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaIngreso') {
            setErrorHoraIngreso(dataMessage.message);
        } else if (dataMessage.dataInfo === 'horaSalida') {
            setErrorHoraSalida(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorFecha,
        errorHoraIngreso,
        errorHoraSalida,
        errorIdRecurso,
        inputData,
        errorData,
        handleInputChange,
    };
}

export default useAddReservation;