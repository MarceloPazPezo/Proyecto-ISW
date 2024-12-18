import { useState } from "react";
import { updateTimeBlock } from '@services/timeblock.service.js';
import { showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";
import { formatPostUpdateTimeBlock } from '@helpers/formatData';

const useEditTimeBlock = (setTimeBlocks, fetchTimeBlocks) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataTimeBlock, setDataTimeBlock] = useState([]);

    const handleClickUpdate = () => {
        if (dataTimeBlock.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedTimeBlockData) => {
        if (updatedTimeBlockData) {
            try {
                // console.log('updatedTimeBlockData:', updatedTimeBlockData);
                const updatedTimeBlock = await updateTimeBlock(updatedTimeBlockData);
                showSuccessAlert('¡Actualizado!', 'El bloque de tiempo ha sido actualizado correctamente.');
                setIsPopupEditOpen(false);

                const formattedTimeBlock = formatPostUpdateTimeBlock(updatedTimeBlock);
                // console.log('formattedTimeBlock:', formattedTimeBlock);

                // setTimeBlocks(prevTimeBlocks => prevTimeBlocks.map(timeBlock => {
                //     return timeBlock.id === formattedTimeBlock.id ? formattedTimeBlock : timeBlock;
                // }));
                await fetchTimeBlocks();

                console.log('formattedTimeBlock:', formattedTimeBlock);

                setDataTimeBlock([]);
            } catch (error) {
                console.error('Error al actualizar el docente:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el docente.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataTimeBlock,
        setDataTimeBlock
    };
}

export default useEditTimeBlock;