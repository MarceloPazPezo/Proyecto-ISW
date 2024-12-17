import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import useAddCourse from "@hooks/courses/useAddCourse.jsx";
import { addCourse } from "@services/course.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatCourseData } from "@helpers/formatData.js";
import useTeachers from "@hooks/users/useGetTeachers.jsx";
import useClassrooms from "@hooks/classrooms/useGetClassrooms.jsx";
import useGetCourses from "@hooks/courses/useGetCourses.jsx";

export default function PopupAddCourse({ show, setShow, dataCourses }) {
    const {
        errorNombre,
        errorIdBossteacher,
        errorIdClassroom,
        errorCantidadAlumnos,
        errorData,
        handleInputChange
    } = useAddCourse();

    const { teachers } = useTeachers();
    const { courses, fetchCourses } = useGetCourses();
    const { classrooms } = useClassrooms();

    const availableTeachers = teachers.filter(
        (teacher) => !courses.some(course => String(course.idBossTeacher) === String(teacher.id))
    );

    const availableClassrooms = classrooms.filter(
        (classroom) =>
            classroom.estado === "Disponible" &&
            !courses.some((course) => String(course.idClassroom) === String(classroom.id))
    );

    const handleSubmit = async (addedCourseData) => {
        try {
            const response = await addCourse(addedCourseData);
            if (response.status === "Client error") {
                errorData(response.details);
            } else {
                const formattedData = formatCourseData(response.data);

                await fetchCourses();

                showSuccessAlert("¡Registrado!", "Curso registrado exitosamente.");
                setShow(false);
                dataCourses((prevCourses) => [...prevCourses, formattedData]);
            }
        } catch (error) {
            console.error("Error al registrar el curso: ", error);
            showErrorAlert("Cancelado", "Ocurrió un error al registrar un curso.");
        }
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <div className="popup-content">
                            <button className="close" onClick={() => setShow(false)}>
                                <img src={CloseIcon} />
                            </button>
                            <Form
                                title="Creando curso"
                                fields={[
                                    {
                                        label: "Nombre",
                                        name: "nombre",
                                        placeholder: "Primero medio",
                                        fieldType: "input",
                                        type: "text",
                                        required: true,
                                        minLength: 3,
                                        maxLength: 50,
                                        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                        errorMessageData: errorNombre,
                                        patternMessage: "Debe contener solo letras, espacios y números.",
                                        onChange: (e) => handleInputChange("nombre", e.target.value),
                                    },
                                    {
                                        label: "Profesor jefe",
                                        name: "idBossTeacher",
                                        fieldType: "select",
                                        options: availableTeachers.map((teacher) => ({
                                            value: teacher.id,
                                            label: `(${teacher.rut}) ${teacher.nombreCompleto}`,
                                        })),
                                        required: true,
                                        defaultValue: "",
                                        errorMessageData: errorIdBossteacher,
                                        onChange: (e) => handleInputChange("idBossTeacher", e.target.value),
                                    },
                                    {
                                        label: "Sala",
                                        name: "idClassroom",
                                        fieldType: "select",
                                        options: availableClassrooms.map((classroom) => ({
                                            value: classroom.id,
                                            label: `${classroom.nombre} (capacidad: ${classroom.capacidad})`,
                                        })),
                                        required: true,
                                        errorMessageData: errorIdClassroom,
                                        onChange: (e) => handleInputChange("idClassroom", e.target.value),
                                    },
                                    {
                                        label: "Cantidad de alumnos",
                                        name: "cantidadAlumnos",
                                        placeholder: "25",
                                        fieldType: "input",
                                        type: "number",
                                        errorMessageData: errorCantidadAlumnos,
                                        required: true,
                                        min: 1,
                                        max: 500,
                                        onChange: (e) => handleInputChange("cantidadAlumnos", e.target.value),
                                    }
                                ]}
                                buttonText="Agregar curso"
                                onSubmit={handleSubmit}
                                backgroundColor={"#fff"}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}