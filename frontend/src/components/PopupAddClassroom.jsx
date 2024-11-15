import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useAddClassroom from '@hooks/classrooms/useAddClassroom.jsx';

export default function PopupAddClassroom({ show, setShow, action }) {
    const {
        errorNombre,
        errorData
    } = useAddClassroom();

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
                        onSubmit={handleSubmit}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}