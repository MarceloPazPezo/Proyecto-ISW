import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import Navbar from '@components/Navbar'; // Asegúrate de importar tu Navbar

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setFilterRut(formattedRut);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const formatRut = (rut) => {
    // Elimina cualquier punto o guión existente
    const cleanRut = rut.replace(/[.-]/g, '');
    // Extrae el dígito verificador
    const dv = cleanRut.slice(-1);
    // Extrae el número sin el dígito verificador
    const number = cleanRut.slice(0, -1);
    // Formatea el número con puntos
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Retorna el RUT formateado
    return `${formattedNumber}-${dv}`;
  };

  const columns = [
    { title: "Nombre", field: "nombreCompleto", width: 350, responsive: 0 },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 2 },
    { title: "Rut", field: "rut", width: 100, responsive: 2 },
    { title: "Teléfono", field: "telefono", width: 100, responsive: 2 },
    { title: "Rol", field: "rol", width: 100, responsive: 2 },
    { title: "Estado", field: "estado", width: 150, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <Navbar /> {/* Asegúrate de que el Navbar esté aquí */}
        <div className='table-container'>
          <div className='top-table'>
            <h1 className='title-table'>Usuarios</h1>
            <div className='filter-actions'>
              <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
              <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
                {dataUser.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
              <button className='delete-user-button' disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
                {dataUser.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
            </div>
          </div>
          <Table
            data={users}
            columns={columns}
            filter={filterRut}
            dataToFilter={'rut'}
            initialSortName={'nombreCompleto'}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
      </div>
  );
};

export default Users;