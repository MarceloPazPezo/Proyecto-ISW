import '@styles/permisos.css'
import { useState, useEffect } from 'react';
import { uploadArchive, getArchivos } from '../services/archivos.service';
import { getUsers } from '../services/user.service.js';

const Permisos = () => {
    const [file, setFile] = useState(null);
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [licencias, setLicencias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 4; // Número de docentes por página

    useEffect(() => {
        const savedUser = JSON.parse(sessionStorage.getItem('usuario'));
        if (savedUser) {
            setUser(savedUser);
            setUserId(savedUser.id);
            // console.log('Usuario cargado:', savedUser);

            // Si el usuario es director o jefe de UTP, obtenemos las licencias
            if (savedUser.rol === 'director' || savedUser.rol === 'jefe de utp') {
                fetchLicencias();  // Cargar las licencias por separado
                fetchProfesores(); // Cargar los profesores
            }
        }
    }, []);

    const fetchLicencias = async () => {
        try {
            const response = await getArchivos();  // Obtener las licencias
            // console.log('Licencias obtenidas:', response.data);
            const sortedLicencias = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setLicencias(sortedLicencias);  // Guardar las licencias ordenadas por fecha
        } catch (error) {
            console.error("Error al obtener las licencias:", error);
        }
    };

    const fetchProfesores = async () => {
        try {
            const response = await getUsers();  // Obtener los profesores
            const licencias = await getArchivos(); 
            // console.log('Profesores obtenidos:', response);

            if (!licencias) {
                console.log("No hay licencias");
            }
            // console.log("Licencias:", licencias);

            // Creamos una nueva lista de profesores
            const updatedTeachers = [];

            // Ahora mapeamos las licencias para encontrar el profesor correspondiente
            licencias.data.map((licencia) => {
                // console.log("Licencia:", licencia);
                for (let i = 0; i < response.length; i++) {
                    if (licencia.idTeacher === response[i].id) {
                        // console.log("Profesor encontrado:", response[i]);
                        const data = { id: licencia.id, responseData: response[i] };
                        updatedTeachers.push(data);  // Añadimos el profesor al array
                    }
                }
            });

            setTeacher(updatedTeachers);  // Actualizamos el estado con todos los profesores encontrados
            // console.log("Teachers:", updatedTeachers);

        } catch (error) {
            console.error("Error al obtener los profesores:", error);
        }
    };

    const handleDownload = async (nombre, archivo) => {
        try {
            // Convertir el base64 a un array de bytes
            const byteCharacters = atob(archivo); // `archivo.base64` es el contenido base64 del archivo PDF
            const byteArrays = [];

            // Convertir cada carácter a su valor de byte correspondiente
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);

                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            // Crear un objeto Blob del PDF
            const blob = new Blob(byteArrays, { type: 'application/pdf' });

            // Crear un enlace de descarga
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = nombre || 'archivo.pdf'; // Nombre del archivo (si no está disponible, usa un nombre por defecto)
            link.click(); // Simula un clic para iniciar la descarga
            URL.revokeObjectURL(link.href); // Libera el objeto URL creado

        } catch (error) {
            console.error("Error al descargar el archivo PDF:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const nombreArchivo = file.name;
            const response = uploadArchive({ nombreArchivo, file, userId, reason });
            if (response) {
                setMessage('¡Licencia subida !' );
                alert('¡Licencia ["' + nombreArchivo + '"] subida !');
                setTimeout(() => setMessage(''), 5000);
            } else {
                setMessage('¡Error al subir la licencia!');
                alert('¡Error al subir la licencia!');
                setTimeout(() => setMessage(''), 5000);
            }
        } else {
            setMessage('Por favor, completa todos los campos.');
        }
    };

    const totalPages = Math.ceil(licencias.length / itemsPerPage);

    const filteredLicencias = licencias.filter(licencia => {
        const profesor = teacher?.find(t => t.id === licencia.id)?.responseData;
        return profesor?.rut?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               profesor?.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const paginatedLicencias = filteredLicencias.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleRemoveFile = () => {
        setFile(null); // Elimina el archivo
    };

    return (
        <>
            <main className="main-content-permisos">
                <div className="permisos-container">
                    <h2>{user?.rol === 'docente' ? 'Subir Licencias y Notificar Ausencias' : 'Descargar Licencias'}</h2>
                    {user?.rol === 'docente' ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="file">Subir Licencia:</label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handleFileChange}
                                />
                                {/* {file && (
                                    <div>
                                        <p>Documento cargado: {file.name}</p>
                                        <button className="button-delete" type="button" onClick={handleRemoveFile}>
                                            Eliminar Documento
                                        </button>
                                    </div>
                                )} */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="reason">Motivo de Ausencia:</label>
                                <textarea
                                    id="reason"
                                    value={reason}
                                    onChange={handleReasonChange}
                                    placeholder="Describe el motivo de tu ausencia si crees que es necesario ..."
                                />
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
                    ) : (
                        <div className="view-licenses">
                            <div className="filter-group">
                                <label htmlFor="search">Buscar por Nombre o RUT:</label>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Ingrese un nombre o RUT..."
                                />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Rut del Profesor</th>
                                        <th>Nombre del Profesor</th>
                                        <th>Nombre del Archivo</th>
                                        <th>Motivo</th>
                                        <th>Fecha de Subida</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {paginatedLicencias.length > 0 ? (
                                        paginatedLicencias.map((licencia) => (
                                            <tr key={licencia.id}>
                                                <td>
                                                    {teacher && teacher.length > 0 ? (
                                                        teacher.map((profesor) =>
                                                            profesor.id === licencia.id ? (
                                                                <span key={profesor.id}>
                                                                    {profesor.responseData.rut}
                                                                </span>
                                                            ) : null
                                                        )
                                                    ) : (
                                                        'Profesor no encontrado'
                                                    )}
                                                </td>
                                                <td>
                                                    {teacher && teacher.length > 0 ? (
                                                        teacher.map((profesor) =>
                                                            profesor.id === licencia.id ? (
                                                                <span key={profesor.id}>
                                                                    {profesor.responseData.nombreCompleto}
                                                                </span>
                                                            ) : null
                                                        )
                                                    ) : (
                                                        'Profesor no encontrado'
                                                    )}
                                                </td>
                                                <td className="name-cell" title={licencia.nombre}>
                                                    {licencia.nombre.length > 30
                                                        ? licencia.nombre.substring(0, 30) + '...'
                                                        : licencia.nombre}
                                                </td>
                                                <td className="reason-cell" title={licencia.mensaje}>
                                                    {licencia.mensaje.length > 100
                                                        ? licencia.mensaje.substring(0, 100) + "..."
                                                        : licencia.mensaje}
                                                </td>
                                                <td>{new Date(licencia.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDownload(licencia.nombre, licencia.archivo)}
                                                    >
                                                        Descargar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No se encontraron licencias.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="pagination-controls">
                                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                                    Anterior
                                </button>
                                <span>
                                    Página {currentPage} de {totalPages}
                                </span>
                                <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {message && <div className="permisos-message">{message}</div>}
            </main>
        </>
    );
};

export default Permisos;
