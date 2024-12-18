import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useGetCourses from "@hooks/courses/useGetCourses.jsx";
import useClassrooms from "@hooks/classrooms/useGetClassrooms.jsx";
import useTeachers from "@hooks/users/useGetTeachers.jsx";

export default function PopupEditCourse({ show, setShow, data, action }) {
    const courseData = data && data.length > 0 ? data[0] : {};

    const { teachers } = useTeachers();
    const { courses } = useGetCourses();
    const { classrooms } = useClassrooms();
    const availableTeachers = teachers.filter(
        (teacher) =>
            !courses.some(
                (course) =>
                    String(course.idBossTeacher) === String(teacher.id) &&
                    String(course.id) !== String(courseData.id)
            )
    );

    if (courseData.idBossTeacher) {
        const currentTeacher = teachers.find(
            (teacher) => String(teacher.id) === String(courseData.idBossTeacher)
        );
        if (currentTeacher && !availableTeachers.some((teacher) => teacher.id === currentTeacher.id)) {
            availableTeachers.push(currentTeacher);
        }
    }

    const availableClassrooms = classrooms.filter(
        (classroom) =>
            classroom.estado === "Disponible" &&
            !courses.some(
                (course) =>
                    String(course.idClassroom) === String(classroom.id) &&
                    String(course.id) !== String(courseData.id)
            )
    );

    if (courseData.idClassroom) {
        const currentClassroom = classrooms.find(
            (classroom) => String(classroom.id) === String(courseData.idClassroom)
        );
        if (
            currentClassroom &&
            !availableClassrooms.some((classroom) => classroom.id === currentClassroom.id)
        ) {
            availableClassrooms.push(currentClassroom);
        }
    }

    const handleSubmit = (formData) => {
        const fullData = {
            ...formData,
            id: courseData.id,
        };
        action(fullData);
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
                                readOnly: true,
                            },
                            {
                                label: "Profesor jefe",
                                name: "idBossTeacher", 
                                fieldType: "select",
                                options: availableTeachers.map((teacher) => ({
                                    value: teacher.id,
                                    label: `(${teacher.rut}) ${teacher.nombreCompleto}`,
                                })),
                                defaultValue: parseInt(courseData.idBossTeacher, 10),
                                required: true,
                            },
                            {
                                label: "Sala",
                                name: "idClassroom",
                                fieldType: "select",
                                options: availableClassrooms.map((classroom) => ({
                                    value: classroom.id,
                                    label: `${classroom.nombre} (${classroom.capacidad})`,
                                })),
                                defaultValue: parseInt(courseData.idClassroom, 10),
                                required: true,
                            },
                            {
                                label: "Cantidad de alumnos",
                                name: "cantidadAlumnos",
                                placeholder: "25",
                                fieldType: "input",
                                type: "number",
                                required: true,
                                min: 1,
                                max: 500,
                                defaultValue: courseData.cantidadAlumnos,
                            }
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