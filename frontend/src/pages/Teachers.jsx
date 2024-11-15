import { useCallback, useState } from 'react';
import { Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useTeachers from '@hooks/users/useGetTeachers.jsx';
import Search from '../components/Search';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import PopupAddTeacher from '../components/PopupAddTeacher';
import PopupEditTeacher from '../components/PopupEditTeacher';
import PopupCopiado from '../components/PopupCopiado';
import useAddTeacher from '../hooks/users/useAddTeacher';
import useEditTeacher from '@hooks/users/useEditTeacher';
import useDeleteTeacher from '@hooks/users/useDeleteTeacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';
import HorarioIcon from '../assets/horarioIcon.svg';
import VentanaHorario from '@components/VentanaHorario';

const Teachers = () => {
  const { teachers, fetchTeachers, setTeachers } = useTeachers();
  const [filterRut, setFilterRut] = useState('');
  const [messageCopied, setMessageCopied] = useState('');
  const [isVentanaHorarioOpen, setIsVentanaHorarioOpen] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const {
    handleAdd,
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddTeacherClick
  } = useAddTeacher(setTeachers);
  
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

  const handleOpenVentanaHorario = (horario) => {
    setHorarioSeleccionado(horario);
    setIsVentanaHorarioOpen(true);
  };

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
    { title: "Nombre", field: "nombreCompleto", responsive: 0, cellClick: handleCellClick },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 2, cellClick: handleCellClick },
    { title: "Rut", field: "rut", width: 100, responsive: 2, cellClick: handleCellClick },
    { title: "Teléfono", field: "telefono", width: 100, responsive: 2, cellClick: handleCellClick },
    { title: "Estado", field: "estado", width: 150, responsive: 2, cellClick: handleCellClick },
    { title: "Creado", field: "createdAt", width: 100, responsive: 2, cellClick: handleCellClick },
    {
      title: "Horario", width: 115, hozAlign: "center",
      formatter: () => {
        return `<img src=${HorarioIcon} alt="horario" style="width: 30px; height: 30px; cursor: pointer;" />`;
      },
      cellClick: (e, cell) => {
        if (e.target.tagName === "IMG") {
          const horario = cell.getRow().getData().horario;
          handleOpenVentanaHorario(horario);
        }
      }
    }
  ];
  
  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Docentes</h1>
          <div className='filter-actions'>
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <Tooltip title="Agregar docente" position="top" trigger="mouseenter">
              <button className={`add-button ${dataTeacher.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddTeacherClick} disabled={dataTeacher.length !== 0}>
                {dataTeacher.length !== 0 ? (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Editar docente" position="top" trigger="mouseenter">
              <button className={`edit-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataTeacher.length === 0}>
                {dataTeacher.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Eliminar docente" position="top" trigger="mouseenter">
              <button className={`delete-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`} onClick={() => handleDelete(dataTeacher)} disabled={dataTeacher.length === 0}>
                {dataTeacher.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Asignaturas impartidas" position="top" trigger="mouseenter">
              <button className={`teach-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataTeacher.length === 0}>
                {dataTeacher.length === 0 ? (
                  <FontAwesomeIcon icon={faBook} style={{ color: "#343965" }} />
                ) : (
                  <FontAwesomeIcon icon={faBook} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
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
        <VentanaHorario
          isOpen={isVentanaHorarioOpen}
          onClose={() => setIsVentanaHorarioOpen(false)}
          horario={horarioSeleccionado} 
        />
      </div>
      <PopupCopiado message={messageCopied} onClose={() => setMessageCopied('')} />
      <PopupAddTeacher show={isPopupAddOpen} setShow={setIsPopupAddOpen} action={handleAdd} />
      <PopupEditTeacher show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataTeacher} action={handleUpdate} />
    </div>
  );
};

export default Teachers;