import { useState, useEffect } from 'react';
import { getTeachesByTeacher } from '@services/teach.service.js';

const useSubjectsByTeacher = (rut) => {
    const [subjectsByTeacher, setSubjectsByTeacher] = useState([]);

    const fetchSubjectsByTeacher = async () => {
        try {
            const response = await getTeachesByTeacher(rut);
            if (response.status === "Success") {
                console.log("Subjects by teacher: ", response.data);
                const formattedData = response.data.map((item) => ({
                    value: item.subject.id,
                    label: item.subject.nombre,
                }));
                setSubjectsByTeacher(formattedData);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchSubjectsByTeacher();
    }, [rut]);

    return { subjectsByTeacher, fetchSubjectsByTeacher };
};

export default useSubjectsByTeacher;
