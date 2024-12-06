import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { useState, useEffect } from 'react';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { createResource } from '../services/resource.service';
import useAddResource from '../hooks/resource/useAddResource';
import { getUserRol } from '../services/user.service.js';



export default function PopupAddResource({ show , setShow }) {
    
    const [dato, setRol] = useState('');
    // const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
                // setUser(savedUser); 
                try {
                    const userRol = await getUserRol(savedUser.email); 
                    setRol(userRol);
                    // console.log('Rol del usuario:', userRol); // Para ver el rol del usuario
                } catch (error) {
                    console.error('Error al obtener el rol del usuario:', error);
                }
            }
        };

        fetchUserRole();
    }, []); // Esto solo se ejecutará una vez al montar el componente
    
    const {
        errorNombre,
        errorData,
        // handleInputChange
    } = useAddResource();

    const addSubmit = async (data) => {
        try {
            // console.log("Data:",dato.data.id);

            const recopilacion = {
                nombre: data.nombre,
                idManager: dato.data.id
            }

            console.log("Recopilación:",recopilacion);

            const response = await createResource(recopilacion);

            // console.log("Response:",response);
            if (response.status === 'Success'){
                showSuccessAlert('¡Agregado!','El recurso ha sido agregado correctamente.');
            }else if (response.status === 'Client error'){
                // console.log("Tira error");
                errorData('Error', response.details);
            }
        } catch (error) {
            console.error('Error al agregar el recurso:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al agregar el recurso.');
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
                        title="Crear recurso"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                placeholder: "Laboratorio de Física, Laboratorio de Química, etc.",
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 5,
                                maxLength: 50,
                                errorMessageData: errorNombre,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                        ]}
                        buttonText="Crear Recurso"
                        onSubmit={addSubmit}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}