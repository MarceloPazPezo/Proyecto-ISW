import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useAddSubject from '@hooks/subjects/useAddSubject.jsx';
import { addSubject } from '@services/subject.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateSubject } from '../helpers/formatData';

export default function PopupAddSubject({ show, setShow, dataSubjects }) {
    const {
        errorNombre,
        errorDepartamento,
        errorData,
        handleInputChange
    } = useAddSubject();

    const handleSubmit = async (addedSubjectData) => {
        if (addedSubjectData) {
            try {
                const response = await addSubject(addedSubjectData);

                if (response.status === 'Client error') {
                    errorData(response.details);
                } else {
                    const formattedSubject = formatPostUpdateSubject(response.data);
                    showSuccessAlert('¡Registrada!','Asignatura registrada exitosamente.');
                    setShow(false);
                    dataSubjects(prevSubjects => [...prevSubjects, formattedSubject]);
                }
            } catch (error) {
                console.error("Error al registrar una asignatura: ", error);
                showErrorAlert('Cancelado', 'Ocurrió un error al registrar.');
            }
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
                                onChange: (e) => handleInputChange("nombre", e.target.value),
                            },
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
                                defaultValue: "",
                                errorMessageData: errorDepartamento,
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