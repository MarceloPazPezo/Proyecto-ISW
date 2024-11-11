import { useNavigate } from 'react-router-dom';
import { login } from '@services/auth.service.js';
import Form from '@components/Form';
import useLogin from '@hooks/auth/useLogin.jsx';
import '@styles/form.css';
import { CSSTransition } from 'react-transition-group'; // npm install react-transition-group
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [inProp, setInProp] = useState(true); // Inicialmente true para mostrar el formulario
    const {
        errorEmail,
        errorPassword,
        errorData,
        handleInputChange
    } = useLogin();

    const loginSubmit = async (data) => {
        try {
            const response = await login(data);
            if (response.status === 'Success') {
                localStorage.setItem('user', JSON.stringify({ email: data.email }));
                setInProp(false); // Cambia a false para iniciar la transición de salida
                setTimeout(() => {
                    navigate('/home');
                }, 300); // Duración de la animación
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
            <main className="login-page">
                <Form
                    title="Iniciar sesión"
                    fields={[
                        {
                            label: "Correo electrónico",
                            name: "email",
                            placeholder: "example@gmail.cl",
                            fieldType: 'input',
                            type: "email",
                            required: true,
                            minLength: 15,
                            maxLength: 30,
                            errorMessageData: errorEmail,
                            validate: {
                                emailDomain: (value) => value.endsWith('@gmail.cl') || 'El correo debe terminar en @gmail.cl'
                            },
                            onChange: (e) => handleInputChange('email', e.target.value),
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
                            errorMessageData: errorPassword,
                            onChange: (e) => handleInputChange('password', e.target.value)
                        },
                    ]}
                    buttonText="Iniciar sesión"
                    onSubmit={loginSubmit}
                    // footerContent={
                    //     <p>
                    //         <a href="/reset-password">¿Olvidaste tu contraseña?</a>
                    //     </p>
                    // }
                />
            </main>
        </CSSTransition>
    );
};

export default Login;