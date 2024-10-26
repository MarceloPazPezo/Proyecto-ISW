import '@styles/permisos.css'
import { useState } from 'react';

const Permisos = () => {
    const [file, setFile] = useState(null);
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    };

    const handleReasonChange = (e) => {
    setReason(e.target.value);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (file && reason) {
        setMessage('¡Licencia subida y ausencia notificada con éxito!');
        // Aquí puedes agregar la lógica para enviar el archivo y el motivo al backend
    } else {
        setMessage('Por favor, completa todos los campos.');
    }
    };

    return (
        <>
        <main className="main-content">
            <div className="permisos-container">
                <h2>Subir Licencias y Notificar Ausencias</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="file">Subir Licencia:</label>
                    <input type="file" id="file" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Motivo de Ausencia:</label>
                    <textarea
                    id="reason"
                    value={reason}
                    onChange={handleReasonChange}
                    placeholder="Describe el motivo de tu ausencia..."
                    />
                </div>
                <button type="submit">Enviar</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </main>
        </>
        );
};

export default Permisos;