import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useSubjects from '@hooks/subjects/useGetSubjects';
import Search from '../components/Search';
import PopupAddSubject from '../components/PopupAddSubject';
import PopupEditSubject from '../components/PopupEditSubject';
import PopupCopiado from "../components/PopupCopiado";
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
    const [messageCopied, setMessageCopied] = useState("");
    const {
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddSubjectClick
    } = useAddSubject();

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

    const handleSelectionChange = useCallback((selectedSubject) => {
        if (selectedSubject.length > 0) {
            setDataSubject([selectedSubject[0]]);
        } else {
            setDataSubject([]);
        }
    }, [setDataSubject]);

    const handleCellClick = (e, cell) => {
        if (e.ctrlKey) {
            const cellValue = cell.getValue();
            navigator.clipboard
                .writeText(cellValue)
                .then(() => setMessageCopied("Copiado"))
                .catch((err) => console.error("Error al copiar al portapapeles:", err));
        }
    };

    const columns = [
        { title: "Nombre", field: "nombre", responsive: 2, cellClick: handleCellClick },
        { title: "Departamento", field: "departamento", responsive: 0, cellClick: handleCellClick },
        { title: "Creado", field: "createdAt", responsive: 0, cellClick: handleCellClick }
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
                            <button className={`delete-user-button ${dataSubject.length === 0 ? 'button-disabled' : ''}`} onClick={() => {handleDelete(dataSubject); setDataSubject([]); }} disabled={dataSubject.length === 0}>
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
            <PopupAddSubject show={isPopupAddOpen} setShow={setIsPopupAddOpen} dataSubjects={setSubjects} />
            <PopupEditSubject show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataSubject} action={handleUpdate} />
            <PopupCopiado message={messageCopied} onClose={() => setMessageCopied("")} />
        </div>
    );
};

export default Subjects;