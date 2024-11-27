import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useAddSubject from '@hooks/subjects/useAddSubject.jsx';

export default function PopupAddSubject({ show, setShow, action }) {
    const {
        errorNombre
    } = useAddSubject();

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
                        title="Creando asignatura"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                placeholder: 'Lenguaje',
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
                                label: "Departamento",
                                name: "departamento",
                                fieldType: 'select',
                                options: [
                                    { value: 'artes', label: 'Artes' },
                                    { value: 'ciencias', label: 'Ciencias' },
                                    { value: 'deportes', label: 'Deportes' },
                                    { value: 'idiomas', label: 'Idiomas' },
                                    { value: 'religion', label: 'Religión' },
                                    { value: 'tecnologia', label: 'Tecnología' },
                                ],
                                required: true,
                                defaultValue: "",
                            }
                        ]}
                        buttonText="Agregar asignatura"
                        onSubmit={handleSubmit}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}