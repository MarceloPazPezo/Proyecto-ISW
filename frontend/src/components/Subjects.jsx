import { useCallback, useState } from 'react';
import { Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useSubjects from '@hooks/subjects/useGetSubjects';
import Search from '../components/Search';
import PopupAddSubject from '../components/PopupAddSubject';
import PopupEditSubject from '../components/PopupEditSubject';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import useAddSubject from '@hooks/subjects/useAddSubject';
import useEditSubject from '@hooks/subjects/useEditSubject';
import useDeleteSubject from '@hooks/subjects/useDeleteSubject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Subjects = () => {
  const { subjects, fetchSubjects, setSubjects } = useSubjects();
  const [filterDepartamento, setFilterDepartamento] = useState('');
 
  const {
    handleAdd,
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddSubjectClick
  } = useAddSubject(setSubjects);
  
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupEditOpen,
    setIsPopupEditOpen,
    dataSubject,
    setDataSubject
  } = useEditSubject(setSubjects);

  const { handleDelete } = useDeleteSubject(fetchSubjects, setDataSubject);

  const handleDepartamentoFilterChange = (e) => {
    const value = e.target.value;
    setFilterDepartamento(value);
  };

  const handleSelectionChange = useCallback((selectedSubjects) => {
    setDataSubject(selectedSubjects);
  }, [setDataSubject]);

  const columns = [
    { title: "Nombre", field: "nombre", responsive: 0 },
    { title: "Departamento", field: "departamento", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
        <div className='table-container'>
            <div className='top-table'>
                <h1 className='title-table'>Asignaturas</h1>
                <div className='filter-actions'>
                    <Search value={filterDepartamento} onChange={handleDepartamentoFilterChange} placeholder={'Filtrar por departamento'} />
                    <Tooltip title="Agregar asignatura" position="top" trigger="mouseenter">
                        <button className={`add-subject-button ${dataSubject.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddSubjectClick} disabled={dataSubject.length !== 0}>
                            {dataSubject.length !== 0 ? (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Editar asignatura" position="top" trigger="mouseenter">
                        <button className={`edit-subject-button ${dataSubject.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataSubject.length === 0}>
                            {dataSubject.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Eliminar asignatura" position="top" trigger="mouseenter">
                        <button className={`delete-user-button ${dataSubject.length === 0 ? 'button-disabled' : ''}`} onClick={() => handleDelete(dataSubject)} disabled={dataSubject.length === 0}>
                            {dataSubject.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </Tooltip>
                </div>
            </div>
            <Table
                data={subjects}
                columns={columns}
                filter={filterDepartamento}
                dataToFilter={'departamento'}
                initialSortName={'nombre'}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    <PopupAddSubject show={isPopupAddOpen} setShow={setIsPopupAddOpen} action={handleAdd} />
    <PopupEditSubject show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataSubject} action={handleUpdate} />
    </div>
  );
};

export default Subjects;