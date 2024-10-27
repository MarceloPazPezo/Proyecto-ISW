import Table from '@components/Table';
import useTeachers from '@hooks/users/useGetTeachers.jsx';
import Search from '../components/Search';
import PopupEditUser from '../components/PopupEditUser';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';

const Teachers = () => {
  const { teachers, fetchTeachers, setTeachers } = useTeachers();
  const [filterRut, setFilterRut] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser
  } = useEditUser(setTeachers);

  const { handleDelete } = useDeleteUser(fetchTeachers, setDataUser);

  const handleRutFilterChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setFilterRut(formattedRut);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const formatRut = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, '');
    const dv = cleanRut.slice(-1);
    const number = cleanRut.slice(0, -1);
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
        <div className='table-container'>
          <div className='top-table'>
            <h1 className='title-table'>Docentes</h1>
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
            data={teachers}
            columns={columns}
            filter={filterRut}
            dataToFilter={'rut'}
            initialSortName={'nombreCompleto'}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <PopupEditUser show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
      </div>
  );
};

export default Teachers;