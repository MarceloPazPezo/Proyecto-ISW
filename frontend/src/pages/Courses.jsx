import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useCourses from '@hooks/courses/useGetCourses';
import Search from '../components/Search';
import PopupAddCourse from '../components/PopupAddCourse';
import PopupEditCourse from '../components/PopupEditCourse';
import PopupCopiado from "../components/PopupCopiado";
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import useAddCourse from '@hooks/courses/useAddCourse';
import useEditCourse from '@hooks/courses/useEditCourse';
import useDeleteCourse from '@hooks/courses/useDeleteCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Courses = () => {
    const { courses, fetchCourses, setCourses } = useCourses();
    const [filterNombre, setFilterNombre] = useState('');
    const [messageCopied, setMessageCopied] = useState("");

    const {
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddCourseClick
    } = useAddCourse();

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataCourse,
        setDataCourse
    } = useEditCourse(setCourses);

    const { handleDelete } = useDeleteCourse(fetchCourses, setDataCourse);

    const handleNombreFilterChange = (e) => {
        const value = e.target.value;
        setFilterNombre(value);
    };

    const handleSelectionChange = useCallback((selectedCourse) => {
        if (selectedCourse.length > 0) {
            setDataCourse([selectedCourse[0]]);
        } else {
            setDataCourse([]);
        }
    }, [setDataCourse]);
    

    
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
        { title: "Profesor Jefe", field: "nombreCompleto", responsive: 0, cellClick: handleCellClick },
        { title: "Rut Profesor Jefe", field: "rut", responsive: 0, cellClick: handleCellClick },
        { title: "Sala", field: "nombreSala", responsive: 0, cellClick: handleCellClick },
        { title: "Cantidad alumnos", field: "cantidadAlumnos", responsive: 0, cellClick: handleCellClick },
        { title: "Creado", field: "createdAt", responsive: 0, cellClick: handleCellClick }
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Cursos</h1>
                    <div className='filter-actions'>
                        <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
                        <Tooltip title="Agregar curso" position="top" trigger="mouseenter">
                            <button className={`add-subject-button ${dataCourse.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddCourseClick} disabled={dataCourse.length !== 0}>
                                {dataCourse.length !== 0 ? (
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip title="Editar curso" position="top" trigger="mouseenter">
                            <button className={`edit-subject-button ${dataCourse.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataCourse.length === 0}>
                                {dataCourse.length === 0 ? (
                                    <img src={UpdateIconDisable} alt="edit-disabled" />
                                ) : (
                                    <img src={UpdateIcon} alt="edit" />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar curso" position="top" trigger="mouseenter">
                            <button className={`delete-user-button ${dataCourse.length === 0 ? 'button-disabled' : ''}`} onClick={() => {handleDelete(dataCourse); setDataCourse([]); }} disabled={dataCourse.length === 0}>
                                {dataCourse.length === 0 ? (
                                    <img src={DeleteIconDisable} alt="delete-disabled" />
                                ) : (
                                    <img src={DeleteIcon} alt="delete" />
                                )}
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <Table
                    data={courses}
                    columns={columns}
                    filter={filterNombre}
                    dataToFilter={'nombre'}
                    initialSortName={'nombre'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupAddCourse show={isPopupAddOpen} setShow={setIsPopupAddOpen} dataCourses={setCourses} />
            <PopupEditCourse show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataCourse} action={handleUpdate} />
            <PopupCopiado message={messageCopied} onClose={() => setMessageCopied("")} />
        </div>
    );
};

export default Courses;