import Table from '@components/Table';
import useTeachers from '@hooks/users/useGetTeachers.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useState } from 'react'; 
import PopupAddTeacher from '../components/PopupAddTeacher';
import PopupEditTeacher from '../components/PopupEditTeacher';
import PopupCopiado from '../components/PopupCopiado';
import useEditTeacher from '@hooks/users/useEditTeacher';
import useDeleteTeacher from '@hooks/users/useDeleteTeacher';
import useGetTimeBlocks from '../hooks/timeblocks/useGetTimeBlocks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const TimeBlocks = () => {
  const { timeblocks } = useGetTimeBlocks();
  const [messageCopied, setMessageCopied] = useState('');
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

  const handleCellClick = (e, cell) => {
    const row = cell.getRow();
    if (e.altKey) {
      if (row.isSelected()) {
        row.deselect();
      } else {
        const tableRows = row.getTable().getRows();
        tableRows.forEach(r => r.deselect());
        row.select();
      }
    } else if (e.ctrlKey) {
      const cellValue = cell.getValue();
      navigator.clipboard.writeText(cellValue)
        .then(() => setMessageCopied('Copiado'))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
    }
  };

  const columns = [
    { title: "ID Profesor", field: "idTeacher", with: 100, responsive: 2, cellClick: handleCellClick },
    { title: "ID Curso", field: "idCourse", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "ID Asignatura", field: "idSubject", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora Inicio", field: "horaInicio", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora termino", field: "horaTermino", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Fecha", field: "fecha", width: 200, responsive: 2, cellClick: handleCellClick },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Bloques</h1>
          <div className='filter-actions'>
            {/* <button className={`add-button ${dataTeacher.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddTeacherClick} disabled={dataTeacher.length !== 0}>
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
            </button> */}
          </div>
        </div>
        <Table
          data={timeblocks}
          columns={columns}
        //   initialSortName={'ID Profesor'}
        //   onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupCopiado message={messageCopied} onClose={() => setMessageCopied('')} />
      <PopupAddTeacher show={isPopupAddOpen} setShow={setIsPopupAddOpen} />
      {/* <PopupEditTeacher show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataTeacher} action={handleUpdate} /> */}
    </div>
  );
};

export default TimeBlocks;