import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupEditSubject({ show, setShow, data, action }) {
    const subjectData = data && data.length > 0 ? data[0] : {};

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
                        title="Editar asignatura"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                defaultValue: subjectData.nombre,
                                placeholder: subjectData.nombre,
                                fieldType: 'input',
                                type: "text",
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,
                                patternMessage: "Debe contener solo letras, espacios y números.",
                                readOnly: true,
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
                                defaultValue: subjectData.departamento || "",
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar asignatura"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}