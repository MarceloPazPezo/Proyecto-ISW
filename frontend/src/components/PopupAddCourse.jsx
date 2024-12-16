import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import useAddCourse from "@hooks/courses/useAddCourse.jsx";
import { addCourse } from "@services/course.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatCourseData } from "@helpers/formatData.js";
import useTeachers from "@hooks/users/useGetTeachers.jsx";


export default function PopupAddCourse({ show, setShow, dataCourses }) {
    const {
        errorNombre,
        errorData,
        handleInputChange
    } = useAddCourse();
    const { teachers } = useTeachers();
    
    const handleSubmit = async (addedCourseData) => {
        try {
            const response = await addCourse(addedCourseData);
            if (response.status === "Client error") {
                errorData(response.details);
            } else {
                const formattedData = formatCourseData(response.data);
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
                                        patternMessage:
                                            "Debe contener solo letras, espacios y números.",
                                        onChange: (e) =>
                                            handleInputChange("nombre", e.target.value),
                                    },
                                    {
                                        label: "Profesor",
                                        name: "nombreCompleto",
                                        fieldType: "select",
                                        options: teachers.map((teacher) => ({
                                            value: teacher.id, 
                                            label: teacher.nombreCompleto,
                                        })),
                                        required: true,
                                        defaultValue: "",
                                        onChange: (e) =>
                                            handleInputChange("nombreCompleto", e.target.value),
                                    },
                                    {
                                        label: "Curso",
                                        name: "idClassroom",
                                        placeholder: "1",
                                        fieldType: "input",
                                        type: "text",
                                        required: true,
                                        minLength: 1,
                                        maxLength: 5,
                                        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                        errorMessageData: errorNombre,
                                        patternMessage:
                                            "Debe contener solo letras, espacios y números.",
                                        onChange: (e) =>
                                            handleInputChange("idClassroom", e.target.value),
                                    },
                                    
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
