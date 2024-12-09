import axios from './root.service.js';

export async function getArchivos() {
    try {
        const { data } = await axios.get('/archive');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function uploadArchive(dataArchive) {
    try {
        const { nombreArchivo, file, userId, reason } = dataArchive;

        console.log("dataArchive", dataArchive);

        // Crear un objeto FormData para enviar los datos, incluyendo el archivo
        const formData = new FormData();
        formData.append("nombre", nombreArchivo);
        formData.append("archivo", file);  // Aquí se agrega el archivo
        formData.append("idTeacher", userId);
        formData.append("mensaje", reason);

        // Realizar la solicitud POST usando FormData
        const response = await axios.post('/archive', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Asegurarse de que se use el tipo de contenido correcto
            },
        });

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}
