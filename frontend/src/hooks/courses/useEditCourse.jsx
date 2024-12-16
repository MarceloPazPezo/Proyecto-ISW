import { useState } from 'react';
import { updateCourse } from '@services/course.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateCourse } from '@helpers/formatData.js';
import { convertirMinusculas } from '@helpers/formatData.js';
import { quitarAcentos } from '../../helpers/formatData';

const useEditCourse = (setCourses) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataCourse, setDataCourse] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataCourse.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedCourseData) => {
        if (updatedCourseData) {
            try {
                console.log(convertirMinusculas(updatedCourseData));
                console.log(quitarAcentos(dataCourse[0].nombre));
                const updatedCourse = await updateCourse(convertirMinusculas(updatedCourseData), quitarAcentos(dataCourse[0].nombre));
                showSuccessAlert('¡Actualizado!','El curso ha sido actualizado correctamente.');
                setIsPopupEditOpen(false);
                const formattedCourse = formatPostUpdateCourse(updatedCourse);

                setCourses(prevCourses => prevCourses.map(course => {
                    return course.nombre === formattedCourse.nombre ? formattedCourse : course;
                }));
                
                setDataCourse([]);
            } catch (error) {
                console.error('Error al actualizar el curso:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el curso.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataCourse,
        setDataCourse
    };
};

export default useEditCourse;