import { useEffect } from 'react';
import '@styles/popupHorario.css';
import Schedule from '@pages/Schedule';

const VentanaHorario = ({ isOpen, onClose, horario, onModify }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose(); // Cierra la ventana si se presiona 'ESC'
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null; // No renderiza si no está abierto

    return (
        <div className="ventana-horario">
            <div className="contenido">
                {/* Aquí se incluye el componente Horario */}
                <Schedule initialHorario={horario} />
                <div className="botones">
                    <button onClick={onModify}>Modificar</button>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default VentanaHorario;
