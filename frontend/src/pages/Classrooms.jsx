import Table from '@components/Table';
import useClassrooms from '@hooks/classrooms/useGetClassrooms';
import Search from '../components/Search';
import PopupAddClassroom from '../components/PopupAddClassroom';
import PopupEditClassroom from '../components/PopupEditClassroom';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import useEditClassroom from '@hooks/classrooms/useEditClassroom';
import useDeleteClassroom from '@hooks/classrooms/useDeleteClassroom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Classrooms = () => {
  const { classrooms, fetchClassrooms, setClassrooms } = useClassrooms();
  const [filterEstado, setFilterEstado] = useState('');
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataClassroom,
    setDataClassroom
  } = useEditClassroom(setClassrooms);

  const { handleDelete } = useDeleteClassroom(fetchClassrooms, setDataClassroom);

  const handleEstadoFilterChange = (e) => {
    const value = e.target.value;
    setFilterEstado(value);
  };

  const handleSelectionChange = useCallback((selectedClassrooms) => {
    setDataClassroom(selectedClassrooms);
  }, [setDataClassroom]);

  const columns = [
    { title: "Nombre", field: "nombre", responsive: 0 },
    { title: "Estado", field: "estado", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  const handleAddClassroomClick = () => {
    setShowPopupAdd(true);
  };

  return (
    <>
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Aulas</h1>
                    <div className='filter-actions'>
                        <Search value={filterEstado} onChange={handleEstadoFilterChange} placeholder={'Filtrar por estado'} />
                        <button className={`add-classroom-button ${dataClassroom.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddClassroomClick} disabled={dataClassroom.length !== 0}>
                            {dataClassroom.length !== 0 ? (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                            )}
                        </button>
                        <button className={`edit-classroom-button ${dataClassroom.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataClassroom.length === 0}>
                            {dataClassroom.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className={`delete-user-button ${dataClassroom.length === 0 ? 'button-disabled' : ''}`} onClick={() => handleDelete(dataClassroom)} disabled={dataClassroom.length === 0}>
                            {dataClassroom.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={classrooms}
                    columns={columns}
                    filter={filterEstado}
                    dataToFilter={'estado'}
                    initialSortName={'nombre'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        <PopupAddClassroom show={showPopupAdd} setShow={setShowPopupAdd} />
        <PopupEditClassroom show={isPopupOpen} setShow={setIsPopupOpen} data={dataClassroom} action={handleUpdate} />
        </div>
    </>
  );
};

export default Classrooms;