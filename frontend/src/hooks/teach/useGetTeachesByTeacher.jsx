import { useState, useEffect } from 'react';
import { getTeachesByTeacher } from '@services/teach.service.js';
import { startCase } from 'lodash';

const useTeachesByTeacher = (rut) => {
    const [subjectsByTeacher, setSubjectsByTeacher] = useState([]);
    const [idTeacher, setIdTeacher] = useState([]);

    useEffect(() => {
        if (!rut) {
            setSubjectsByTeacher([]);
            setIdTeacher(null);
            return;
        }

        const fetchSubjects = async () => {
            try {
                const response = await getTeachesByTeacher(rut);
                if (response.status === 'Success') {
                    const formattedData = response.data.map((item) => ({
                        value: item.subject.id,
                        label: startCase(item.subject.nombre),
                        relationId: item.id,
                    }));
                    const id = response.data[0]?.teacher?.id || null;
                    setIdTeacher(id);
                    setSubjectsByTeacher(formattedData);
                } else {
                    setIdTeacher(null);
                    setSubjectsByTeacher([]);
                }
            } catch (err) {
                console.error('Error al obtener asignaturas:', err);
            }
        };

        fetchSubjects();
    }, [rut]);

    return { subjectsByTeacher, idTeacher };
};

export default useTeachesByTeacher;