import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import PopupAddUser from '../components/PopupAddUser';
import PopupEditUser from '../components/PopupEditUser';
import PopupCopiado from '../components/PopupCopiado';
import useAddUser from '@hooks/users/useAddUser';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');
  const [messageCopied, setMessageCopied] = useState('');
  const {
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddUserClick
  } = useAddUser(setUsers);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupEditOpen,
    setIsPopupEditOpen,
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setFilterRut(formattedRut);
  };

  const handleSelectionChange = useCallback((selectedUser) => {
    if (selectedUser.length > 0) {
      setDataUser([selectedUser[0]]);
    } else {
      setDataUser([]);
    }
  }, [setDataUser]);

  const formatRut = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, '');
    const dv = cleanRut.slice(-1);
    const number = cleanRut.slice(0, -1);
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedNumber}-${dv}`;
  };

  const handleCellClick = (e, cell) => {
    if (e.ctrlKey) {
      const cellValue = cell.getValue();
      navigator.clipboard.writeText(cellValue)
        .then(() => setMessageCopied('Copiado'))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
    }
  };

  const columns = [
    { title: "Rut", field: "rut", width: 100, responsive: 2, cellClick: handleCellClick },
    { title: "Nombre", field: "nombreCompleto", responsive: 0, cellClick: handleCellClick },
    { title: "Correo electrónico", field: "email", responsive: 0, cellClick: handleCellClick },
    { title: "Teléfono", field: "telefono", responsive: 0, cellClick: handleCellClick },
    { title: "Rol", field: "rol", responsive: 2, cellClick: handleCellClick },
    { title: "Estado", field: "estado", responsive: 0, cellClick: handleCellClick },
    { title: "Creado", field: "createdAt", responsive: 0, cellClick: handleCellClick }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Usuarios</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <Tooltip title="Agregar Usuario" position="top" trigger="mouseenter">
              <button className={`add-button ${dataUser.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddUserClick} disabled={dataUser.length !== 0}>
                {dataUser.length !== 0 ? (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Editar usuario" position="top" trigger="mouseenter">
              <button className={`edit-user-button ${dataUser.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataUser.length === 0}>
                {dataUser.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Eliminar usuario" position="top" trigger="mouseenter">
              <button className={`delete-user-button ${dataUser.length === 0 ? 'button-disabled' : ''}`} onClick={() => {handleDelete(dataUser); setDataUser([]); }} disabled={dataUser.length === 0} >
                {dataUser.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
            </Tooltip>
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
      <PopupCopiado
        message={messageCopied}
        onClose={() => setMessageCopied('')}
      />
      <PopupAddUser
        show={isPopupAddOpen}
        setShow={setIsPopupAddOpen}
        dataUsers={setUsers}
      />
      <PopupEditUser
        show={isPopupEditOpen}
        setShow={setIsPopupEditOpen}
        data={dataUser}
        action={handleUpdate}
      />
    </div>
  );
};

export default Users;