import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { addClassroom } from '@services/classroom.service.js';
import useAddClassroom from '@hooks/classrooms/useAddClassroom.jsx';

export default function PopupAddClassroom({ show, setShow }) {
    const {
        errorNombre,
        errorData
    } = useAddClassroom();

    const addSubmit = async (data) => {
        try {
            const response = await addClassroom(data);
            if (response.status === 'Success') {
                showSuccessAlert('¡Registrada!','Aula registrada exitosamente.');
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.error("Error al registrar un aula: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    }
    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Creando aula"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                placeholder: 'A101AA',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                errorMessageData: errorNombre,
                                patternMessage: "Debe contener solo letras, espacios y números.",
                            },
                            {
                                label: "Estado",
                                name: "estado",
                                fieldType: 'select',
                                options: [
                                    { value: 'disponible', label: 'Disponible' },
                                    { value: 'ocupada', label: 'Ocupada' },
                                ],
                                required: true,
                                defaultValue: "",
                            }
                        ]}
                        buttonText="Agregar aula"
                        onSubmit={addSubmit}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}