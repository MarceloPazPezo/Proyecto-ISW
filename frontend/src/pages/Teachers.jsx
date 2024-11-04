import Table from '@components/Table';
import useTeachers from '@hooks/users/useGetTeachers.jsx';
import Search from '../components/Search';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import PopupAddTeacher from '../components/PopupAddTeacher';
import PopupEditTeacher from '../components/PopupEditTeacher';
import useEditTeacher from '@hooks/users/useEditTeacher';
import useDeleteTeacher from '@hooks/users/useDeleteTeacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Teachers = () => {
  const { teachers, fetchTeachers, setTeachers } = useTeachers();
  const [filterRut, setFilterRut] = useState('');
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupEditOpen,
    setIsPopupEditOpen,
    dataTeacher,
    setDataTeacher
  } = useEditTeacher(setTeachers);

  const { handleDelete } = useDeleteTeacher(fetchTeachers, setDataTeacher);

  const handleRutFilterChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setFilterRut(formattedRut);
  };

  const handleSelectionChange = useCallback((selectedTeachers) => {
    setDataTeacher(selectedTeachers);
  }, [setDataTeacher]);

  const formatRut = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, '');
    const dv = cleanRut.slice(-1);
    const number = cleanRut.slice(0, -1);
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedNumber}-${dv}`;
  };

  const columns = [
    { title: "Nombre", field: "nombreCompleto", responsive: 0 },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 2 },
    { title: "Rut", field: "rut", width: 100, responsive: 2 },
    { title: "Teléfono", field: "telefono", width: 100, responsive: 2 },
    { title: "Estado", field: "estado", width: 150, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 2 }
  ];

  const handleAddTeacherClick = () => {
    setIsPopupAddOpen(true);
  };

  return (
    <div className='main-container'>
        <div className='table-container'>
            <div className='top-table'>
                <h1 className='title-table'>Docentes</h1>
                <div className='filter-actions'>
                    <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
                    <button className={`add-button ${dataTeacher.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddTeacherClick} disabled={dataTeacher.length !== 0}>
                        {dataTeacher.length !== 0 ? (
                            <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                        ) : (
                            <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                        )}
                    </button>
                    <button className={`edit-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataTeacher.length === 0}>
                        {dataTeacher.length === 0 ? (
                            <img src={UpdateIconDisable} alt="edit-disabled" />
                        ) : (
                            <img src={UpdateIcon} alt="edit" />
                        )}
                    </button>
                    <button className={`delete-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`} onClick={() => handleDelete(dataTeacher)} disabled={dataTeacher.length === 0}>
                        {dataTeacher.length === 0 ? (
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
                initialSortName={'nombre'}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    <PopupAddTeacher show={isPopupAddOpen} setShow={setIsPopupAddOpen} />
    <PopupEditTeacher show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataTeacher} action={handleUpdate} />
    </div>
  );
};

export default Teachers;