import { useCallback, useState } from 'react';
import { Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Table from '@components/Table';
import useCourses from '@hooks/courses/useGetCourses';
import Search from '../components/Search';
import PopupAddCourse from '../components/PopupAddCourse';
import PopupEditCourse from '../components/PopupEditCourse';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import useAddCourse from '@hooks/courses/useAddCourse';
import useEditCourse from '@hooks/courses/useEditCourse';
import useDeleteCourse from '@hooks/c/useDeleteCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/spreadsheet.css';

const Courses = () => {
  const { courses, fetchCourses, setCourses } = useCourses();
  const [filterNombre, setFilterNombre] = useState('');
 
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

  const handleSelectionChange = useCallback((selectedCourses) => {
    setDataCourse(selectedCourses);
  }, [setDataCourse]);

  const columns = [
    { title: "Nombre", field: "nombre", responsive: 0 },
    { title: "Profesor", field: "idBossTeacher", width: 200, responsive: 2 },
    { title: "Sala", field: "idClassroom", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
        <div className='table-container'>
            <div className='top-table'>
                <h1 className='title-table'>Cursos</h1>
                <div className='filter-actions'>
                    <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
                    <Tooltip title="Agregar curso" position="top" trigger="mouseenter">
                        <button className={`add-subject-button ${dataSubject.length !== 0 ? 'button-disabled' : ''}`} onClick={handleAddCourseClick} disabled={dataCourse.length !== 0}>
                            {dataCourse.length !== 0 ? (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Editar curso" position="top" trigger="mouseenter">
                        <button className={`edit-subject-button ${dataSubject.length === 0 ? 'button-disabled' : ''}`} onClick={handleClickUpdate} disabled={dataCourse.length === 0}>
                            {dataCourse.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                    </Tooltip>
                    <Tooltip title="Eliminar curso" position="top" trigger="mouseenter">
                        <button className={`delete-user-button ${dataSubject.length === 0 ? 'button-disabled' : ''}`} onClick={() => handleDelete(dataCourse)} disabled={dataCourse.length === 0}>
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
                dataToFilter={'Nombre'}
                initialSortName={'nombre'}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    <PopupAddCourse show={isPopupAddOpen} setShow={setIsPopupAddOpen} dataCourses={setCourses} />
    <PopupEditCourse show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataCourse} action={handleUpdate} />
    </div>
  );
};

export default Courses;