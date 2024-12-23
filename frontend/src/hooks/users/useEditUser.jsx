import { useState } from 'react';
import { updateUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditUser = (setUsers) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataUser.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedUserData) => {
        if (updatedUserData) {
            try {
            const updatedUser = await updateUser(updatedUserData, dataUser[0].rut);
            showSuccessAlert('¡Actualizado!','El usuario ha sido actualizado correctamente.');
            setIsPopupEditOpen(false);
            const formattedUser = formatPostUpdate(updatedUser);

            setUsers(prevUsers => prevUsers.map(user => {
                return user.email === formattedUser.email ? formattedUser : user;
            }));
            

            setDataUser([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el usuario.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataUser,
        setDataUser
    };
};

export default useEditUser;