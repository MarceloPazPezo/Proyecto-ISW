import { useState } from 'react';
import { updateResource } from '@services/resource.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateResource } from '@helpers/formatData.js';

const useEditResource = (setTeachers) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataResource, setDataResource] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataResource.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedResourceData) => {
        if (updatedResourceData) {
            try {
                const updatedResource = await updateResource(updatedResourceData, dataResource[0].id);
                showSuccessAlert('¡Actualizado!','El recurso ha sido actualizado correctamente.');
                setIsPopupEditOpen(false);
                const formattedResource = formatPostUpdateResource(updatedResource);

                setTeachers(prevResources => prevResources.map(resource => {
                    console.log("Recurso actual:", resource);
                    if (resource.id === formattedResource.id) {
                        console.log("Reemplazando con:", formattedResource);
                    }
                    return resource.nombre === formattedResource.nombre ? formattedResource : resource;
                }));
                

                setDataResource([]);
            } catch (error) {
                console.error('Error al actualizar el recurso:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el recurso.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataResource,
        setDataResource
    };
};

export default useEditResource;