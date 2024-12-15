import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useTeachers from "@hooks/users/useGetTeachers.jsx";

export default function PopupEditCourse({ show, setShow, data, action }) {
    const courseData = data && data.length > 0 ? data[0] : {};
    const { teachers } = useTeachers(); 

    const teachersOptions = teachers.map((teacher) => ({
        value: teacher.id,
        label: teacher.nombreCompleto,
      }));

    const defaultTeacher = teachers.find(teacher => teacher.id === courseData.idBossTeacher) || null;

    
    const handleSubmit = (formData) => {
        action(formData);
    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar curso"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                defaultValue: courseData.nombre,
                                placeholder: courseData.nombre,
                                fieldType: 'input',
                                type: "text",
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                patternMessage: "Debe contener solo letras, espacios y números.",
                                disabled: true,
                            },
                            {
                                label: "Profesor",
                                name: "nombreCompleto", 
                                fieldType: "select",
                                options: teachersOptions,
                                defaultValue: defaultTeacher,
                                required: true,
                            },
                            {
                                label: "Sala",
                                name: "idClassroom",
                                defaultValue: courseData.idClassroom,
                                placeholder: courseData.idClassroom,
                                fieldType: 'input',
                                type: "text",
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                patternMessage: "Debe contener solo letras, espacios y números.",
                                disabled: true,
                            },

                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar curso"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}