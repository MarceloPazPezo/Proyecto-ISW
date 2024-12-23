import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import useAddUser from "@hooks/users/useAddUser";
import { addUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

export default function PopupAddUser({ show, setShow, dataUsers }) {
  const {
    errorNombreCompleto,
    errorEmail,
    errorRut,
    errorTelefono,
    errorRol,
    errorPassword,
    errorData,
    handleInputChange
  } = useAddUser();

  const handleSubmit = async (addedUserData) => {
    if (addedUserData) {
      try {
        const response = await addUser(addedUserData);
        if (response.status === "Client error") {
          errorData(response.details);
        } else {
          const formattedUser = formatPostUpdate(response.data);
          showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
          setShow(false);
          dataUsers(prevUsers => [...prevUsers, formattedUser]);
        }
      } catch (error) {
        console.error("Error al registrar el usuario: ", error);
        showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
      }
    }
  }
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
                title="Crear usuario"
                fields={[
                  {
                    label: "Nombre completo",
                    name: "nombreCompleto",
                    placeholder: "Nombres Apellidos",
                    fieldType: "input",
                    type: "text",
                    required: true,
                    minLength: 15,
                    maxLength: 50,
                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    patternMessage: "Debe contener solo letras y espacios",
                    errorMessageData: errorNombreCompleto,
                    onChange: (e) =>
                      handleInputChange("nombreCompleto", e.target.value),
                  },
                  {
                    label: "Correo electrónico",
                    name: "email",
                    placeholder: "example@gmail.cl",
                    fieldType: "input",
                    type: "email",
                    required: true,
                    minLength: 15,
                    maxLength: 35,
                    errorMessageData: errorEmail,
                    validate: {
                      emailDomain: (value) =>
                        value.endsWith("@gmail.com") ||
                        value.endsWith("@gmail.cl") ||
                        "El correo debe terminar en @gmail.cl o @gmail.com",
                    },
                    onChange: (e) => handleInputChange("email", e.target.value),
                  },
                  {
                    label: "Rut",
                    name: "rut",
                    placeholder: "12.345.678-9",
                    fieldType: "input",
                    type: "text",
                    minLength: 9,
                    maxLength: 12,
                    pattern: patternRut,
                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                    required: true,
                    errorMessageData: errorRut,
                    onChange: (e) => handleInputChange("rut", e.target.value),
                  },
                  {
                    label: "Teléfono",
                    name: "telefono",
                    placeholder: "987654321",
                    fieldType: "input",
                    type: "tel",
                    required: true,
                    minLength: 9,
                    maxLength: 9,
                    pattern: /^\d{9}$/,
                    patternMessage: "Debe contener solo números",
                    errorMessageData: errorTelefono,
                    onChange: (e) =>
                      handleInputChange("telefono", e.target.value),
                  },
                  {
                    label: "Rol",
                    name: "rol",
                    fieldType: "select",
                    options: [
                      { value: "administrador", label: "Administrador" },
                      { value: "director", label: "Director" },
                      { value: "docente", label: "Docente" },
                      { value: "encargado", label: "Encargado" },
                      { value: "jefe de utp", label: "Jefe de UTP" },
                      { value: "usuario", label: "Usuario" },
                    ],
                    required: true,
                    defaultValue: "usuario",
                    errorMessageData: errorRol,
                    onChange: (e) =>
                      handleInputChange("rol", e.target.value),
                  },
                  {
                    label: "Contraseña",
                    name: "password",
                    placeholder: "**********",
                    fieldType: "input",
                    type: "password",
                    required: true,
                    minLength: 8,
                    maxLength: 26,
                    pattern: /^[a-zA-Z0-9]+$/,
                    patternMessage: "Debe contener solo letras y números",
                    errorMessageData: errorPassword,
                    onChange: (e) =>
                      handleInputChange("password", e.target.value),
                  },
                ]}
                buttonText="Crear Usuario"
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
