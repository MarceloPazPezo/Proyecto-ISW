import { useState } from "react";
import { updateTimeBlock } from '@services/timeblock.service.js';
import { showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useEditTimeBlock = (setTimeBlocks) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataTimeBlock, setDataTimeBlock] = useState([]);

    const handleClickUpdate = () => {
        if (dataTimeBlock.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updateTimeBlockData) => {
        if (updateTimeBlockData) {
            try {
                // console.log("DataTimeBlock: ", updateTimeBlockData);
                const updatedTimeBlock = await updateTimeBlock(updateTimeBlockData); 
                showSuccessAlert('¡Actualizado!','El bloque de tiempo ha sido actualizado correctamente.');
                // console.log('Bloque de tiempo actualizado:', updatedTimeBlock);
                setIsPopupOpen(false);
                setTimeBlocks(prevTimeBlocks => prevTimeBlocks.map(timeblock => timeblock.id === updatedTimeBlock.id ? updatedTimeBlock : timeblock));
                setDataTimeBlock([]);
            } catch (error) {
                console.error('Error al actualizar elm bloque de tiempo:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el bloque de tiempo.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataTimeBlock,
        setDataTimeBlock
    };
}

export default useEditTimeBlock;