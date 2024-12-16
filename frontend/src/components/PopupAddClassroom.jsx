import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import useAddClassroom from "@hooks/classrooms/useAddClassroom.jsx";
import { addClassroom } from "@services/classroom.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatClassroomData } from "@helpers/formatData.js";

export default function PopupAddClassroom({ show, setShow, dataClassrooms }) {
    const {
        errorNombre,
        errorCapacidad,
        errorData,
        handleInputChange
    } = useAddClassroom();

    const handleSubmit = async (addedClassroomData) => {
        try {
            const response = await addClassroom(addedClassroomData);
            if (response.status === "Client error") {
                if (response.details.includes("capacidad debe")) {
                    errorData({ dataInfo: 'capacidad', message: response.details });
                }
                errorData(response.details);
            } else {
                const formattedData = formatClassroomData(response.data);
                showSuccessAlert("¡Registrada!", "Aula registrada exitosamente.");
                setShow(false);
                dataClassrooms((prevClassrooms) => [...prevClassrooms, formattedData]);
            }
        } catch (error) {
            console.error("Error al registrar un aula: ", error);
            showErrorAlert("Cancelado", "Ocurrió un error al registrar un aula.");
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
                                title="Creando aula"
                                fields={[
                                    {
                                        label: "Nombre",
                                        name: "nombre",
                                        placeholder: "A101AA",
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
                                        label: "Estado",
                                        name: "estado",
                                        fieldType: "select",
                                        options: [
                                            { value: "disponible", label: "Disponible" },
                                            { value: "ocupada", label: "Ocupada" },
                                        ],
                                        required: true,
                                        defaultValue: "",
                                        onChange: (e) =>
                                            handleInputChange("estado", e.target.value),
                                    },
                                    {
                                        label: "Capacidad",
                                        name: "capacidad",
                                        placeholder: "25",
                                        fieldType: "input",
                                        type: "number",
                                        errorMessageData: errorCapacidad,
                                        required: true,
                                        min: 1,
                                        max: 500,
                                        onChange: (e) =>
                                            handleInputChange("capacidad", e.target.value),
                                    }
                                ]}
                                buttonText="Agregar aula"
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
