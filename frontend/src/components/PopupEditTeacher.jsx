import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import QuestionIcon from "@assets/QuestionCircleIcon.svg";

export default function PopupEditTeacher({ show, setShow, data, action }) {
  const teacherData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action(formData);
  };

  const patternRut = new RegExp(
    /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/
  );
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
                title="Editar docente"
                fields={[
                  {
                    label: "Nombre completo",
                    name: "nombreCompleto",
                    defaultValue: teacherData.nombreCompleto || "",
                    placeholder: "Diego Alexis Salazar Jara",
                    fieldType: "input",
                    type: "text",
                    required: true,
                    minLength: 15,
                    maxLength: 50,
                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    patternMessage: "Debe contener solo letras y espacios",
                  },
                  {
                    label: "Correo electrónico",
                    name: "email",
                    defaultValue: teacherData.email || "",
                    fieldType: "input",
                    type: "email",
                    disabled: true,
                  },
                  {
                    label: "Rut",
                    name: "rut",
                    defaultValue: teacherData.rut || "",
                    placeholder: "21.308.770-3",
                    fieldType: "input",
                    type: "text",
                    minLength: 9,
                    maxLength: 12,
                    pattern: patternRut,
                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                    disabled: true,
                  },
                  {
                    label: "Teléfono",
                    name: "telefono",
                    defaultValue: teacherData.telefono || "",
                    placeholder: "912345678",
                    fieldType: "input",
                    type: "tel",
                    disabled: true,
                    minLength: 9,
                    maxLength: 9,
                    pattern: /^\d{9}$/,
                    patternMessage: "Debe ser xxxxxxxxx",
                  },
                  {
                    label: "Estado",
                    name: "estado",
                    fieldType: "select",
                    options: [
                      { value: "regular", label: "Regular" },
                      { value: "desvinculado", label: "Desvinculado" },
                    ],
                    required: true,
                    defaultValue: teacherData.estado || "",
                  },
                  {
                    label: (
                      <span>
                        Nueva contraseña
                        <span className="tooltip-icon">
                          <img src={QuestionIcon} />
                          <span className="tooltip-text">
                            Este campo es opcional
                          </span>
                        </span>
                      </span>
                    ),
                    name: "newPassword",
                    placeholder: "**********",
                    fieldType: "input",
                    type: "password",
                    required: false,
                    minLength: 8,
                    maxLength: 26,
                    pattern: /^[a-zA-Z0-9]+$/,
                    patternMessage: "Debe contener solo letras y números",
                  },
                ]}
                onSubmit={handleSubmit}
                buttonText="Editar docente"
                backgroundColor={"#fff"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
