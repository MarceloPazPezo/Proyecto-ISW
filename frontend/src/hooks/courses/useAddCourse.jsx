import { useState, useEffect } from 'react';

const useAddCourse = () => {
    const [errorNombre, setErrorNombre] = useState('');
    const [inputDataNombre, setInputDataNombre] = useState({ nombre: '' });
    const [errorIdBossteacher, setErrorIdBossteacher] = useState('');
    const [inputDataIdBossteacher, setInputDataIdBossteacher] = useState({ idBossteacher: '' });
    const [errorIdClassroom, setErrorIdClassroom] = useState('');
    const [inputDataIdClassroom, setInputDataIdClassroom] = useState({ idClassroom: '' });
    const [errorCantidadAlumnos, setErrorCantidadAlumnos] = useState('');
    const [inputDataCantidadAlumnos, setInputDataCantidadAlumnos] = useState({ cantidadAlumnos: '' });

    useEffect(() => {
        if (inputDataNombre.nombre) setErrorNombre('');
        if (inputDataIdBossteacher.idBossteacher) setErrorIdBossteacher('');
        if (inputDataIdClassroom.idClassroom) setErrorIdClassroom('');
        if (inputDataCantidadAlumnos.cantidadAlumnos) setErrorCantidadAlumnos('');
    }, [inputDataNombre, inputDataIdBossteacher, inputDataIdClassroom, inputDataCantidadAlumnos]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.message);
        }
        if (dataMessage.dataInfo === 'idBossteacher') {
            setErrorIdBossteacher(dataMessage.message);
        }
        if (dataMessage.dataInfo === 'idClassroom') {
            setErrorIdClassroom(dataMessage.message);
        }
        if (dataMessage.dataInfo === 'cantidadAlumnos') {
            setErrorCantidadAlumnos(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        if (field === 'nombre') {
            setInputDataNombre(prevState => ({
                ...prevState,
                nombre: value
            }));
        } else if (field === 'idBossteacher') {
            setInputDataIdBossteacher(prevState => ({
                ...prevState,
                idBossteacher: value
            }));
        } else if (field === 'idClassroom') {
            setInputDataIdClassroom(prevState => ({
                ...prevState,
                idClassroom: value
            }));
        } else if (field === 'cantidadAlumnos') {
            setInputDataCantidadAlumnos(prevState => ({
                ...prevState,
                cantidadAlumnos: value
            }));

        };
    };

    return {
        errorNombre,
        inputDataNombre,
        errorIdBossteacher,
        inputDataIdBossteacher,
        errorIdClassroom,
        inputDataIdClassroom,
        errorCantidadAlumnos,
        inputDataCantidadAlumnos,
        errorData,
        handleInputChange,
    };
};

export default useAddCourse;