import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useAddTeacher from '@hooks/users/useAddTeacher.jsx';

export default function PopupAddTeacher({ show, setShow, action }) {
    const {
        errorEmail,
        errorRut,
        errorTelefono,
        handleInputChange
    } = useAddTeacher();

    const handleSubmit = (formData) => {
        action(formData);
    };

    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Crear usuario"
                        fields={[
                            {
                                 label: "Nombre completo",
                                name: "nombreCompleto",
                                placeholder: "Diego Alexis Salazar Jara",
                                fieldType: 'input',
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
                                placeholder: "example@gmail.cl",
                                fieldType: 'input',
                                type: "email",
                                required: true,
                                minLength: 15,
                                maxLength: 35,
                                errorMessageData: errorEmail,
                                validate: {
                                    emailDomain: (value) => value.endsWith('@gmail.com') || value.endsWith('@gmail.cl') || 'El correo debe terminar en @gmail.cl o @gmail.com'
                                },
                                onChange: (e) => handleInputChange('email', e.target.value)
                            },
                            {
                                label: "Rut",
                                name: "rut",
                                placeholder: "23.770.330-1",
                                fieldType: 'input',
                                type: "text",
                                minLength: 9,
                                maxLength: 12,
                                pattern: patternRut,
                                patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                required: true,
                                errorMessageData: errorRut,
                                onChange: (e) => handleInputChange('rut', e.target.value)
                            },
                            {
                                label: "Teléfono",
                                name: "telefono",
                                placeholder: "987654321",
                                fieldType: 'input',
                                type: "tel",
                                required: true,
                                minLength: 9,
                                maxLength: 9,
                                pattern: /^\d{9}$/,
                                patternMessage: "Debe contener solo números",
                                errorMessageData: errorTelefono,
                                onChange: (e) => handleInputChange('telefono', e.target.value)
                            },
                            {
                                label: "Contraseña",
                                name: "password",
                                placeholder: "**********",
                                fieldType: 'input',
                                type: "password",
                                required: true,
                                minLength: 8,
                                maxLength: 26,
                                pattern: /^[a-zA-Z0-9]+$/,
                                patternMessage: "Debe contener solo letras y números",
                            },
                        ]}
                        buttonText="Crear Docente"
                        onSubmit={handleSubmit}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}

