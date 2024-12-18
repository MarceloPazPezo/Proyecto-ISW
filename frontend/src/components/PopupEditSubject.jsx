import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
//popup en formato de formulario para editar asignatura
export default function PopupEditSubject({ show, setShow, data, action }) {
    const subjectData = data && data.length > 0 ? data[0] : {};
//Envio de formulario
    const handleSubmit = (formData) => {
        action(formData);
    };
// Muestra los elementos del formulario donde podemos editar la asignatura
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
//campo de departamento modificable
                            {
                                label: "Departamento",
                                name: "departamento",
                                fieldType: 'select',
                                options: [
                                    { value: 'artes', label: 'Artes' },
                                    { value: 'ciencias', label: 'Ciencias' },
                                    { value: 'deportes', label: 'Deportes' },
                                    { value: 'humanista', label: 'Humanista' },
                                    { value: 'idiomas', label: 'Idiomas' },
                                    { value: 'religion', label: 'Religión' },
                                    { value: 'tecnologia', label: 'Tecnología' },
                                ],
                                required: true,
                                defaultValue: subjectData.departamento.toLowerCase() || "",
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