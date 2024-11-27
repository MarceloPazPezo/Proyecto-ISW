import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

export default function PopupEditClassroom({ show, setShow, data, action }) {
    const classroomData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
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
                                title="Editar aula"
                                fields={[
                                    {
                                        label: "Nombre",
                                        name: "nombre",
                                        defaultValue: classroomData.nombre || "",
                                        placeholder: "A101AA",
                                        fieldType: "input",
                                        type: "text",
                                        disabled: true,
                                        minLength: 3,
                                        maxLength: 50,
                                        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                        patternMessage:
                                            "Debe contener solo letras, espacios y números.",
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
                                        defaultValue: classroomData.estado || "",
                                    },
                                ]}
                                onSubmit={handleSubmit}
                                buttonText="Editar aula"
                                backgroundColor={"#fff"}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
