import Table from '@components/Table';
import { useState, useCallback } from 'react';
import { Tooltip } from "react-tippy";
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import PopupCopiado from '../components/PopupCopiado';
import PopupAddTimeBlock from '../components/PopupAddTimeBlock';
import PopupEditTimeBlock from '../components/PopupEditTimeBlock';
import useGetTimeBlocks from '../hooks/timeblocks/useGetTimeBlocks';
import useGetSubjects from '../hooks/subjects/useGetSubjects';
import useGetCourses from '../hooks/courses/useGetCourses';
import useGetTeachers from '../hooks/users/useGetTeachers';
import useAddTimeBlock from '../hooks/timeblocks/useAddTimeBlock';
import useEditTimeBlock from '../hooks/timeblocks/useEditTimeBlock';
import useDeleteTimeBlock from '../hooks/timeblocks/useDeleteTimeBlock';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/horarios.css';

const TimeBlocks = () => {
  const [messageCopied, setMessageCopied] = useState('');

  const {
    timeblocks,
    setTimeBlocks,
    fetchTimeBlocks
  } = useGetTimeBlocks();

  const {
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddTimeBlockClick
  } = useAddTimeBlock();

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupEditOpen,
    setIsPopupEditOpen,
    dataTimeBlock,
    setDataTimeBlock
  } = useEditTimeBlock(setTimeBlocks);

  const { handleDelete } = useDeleteTimeBlock(
    fetchTimeBlocks,
    setDataTimeBlock
  );

  const {
    subjects,
  } = useGetSubjects();

  const {
    courses,
  } = useGetCourses();

  const {
    teachers,
  } = useGetTeachers();

  const handleSelectionChange = useCallback(
    (selectedTimeBlocks) => {
      setDataTimeBlock(selectedTimeBlocks);
      console.log(selectedTimeBlocks);
    },
    [setDataTimeBlock]
  );

  const handleCellClick = (e, cell) => {
    if (e.ctrlKey) {
      const cellValue = cell.getValue();
      navigator.clipboard
        .writeText(cellValue)
        .then(() => setMessageCopied("Copiado"))
        .catch((err) => console.error("Error al copiar al portapapeles:", err));
    }
  };



  const getTeacherNameById = (id) => {
    const teacher = teachers.find(t => t.id === id);
    return teacher ? teacher.nombreCompleto : 'Profesor no encontrado';
  };

  const getCourseNameById = (id) => {
    const course = courses.find(c => c.id === id);
    return course ? course.nombre : 'Curso no encontrado';
  };

  const getSubjectNameById = (id) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.nombre : 'Asignatura no encontrada';
  };

  const timeBlocksConNombres = timeblocks.map(timeblock => ({
    ...timeblock,
    teacherName: getTeacherNameById(timeblock.idTeacher),
    courseName: getCourseNameById(timeblock.idCourse),
    subjectName: getSubjectNameById(timeblock.idSubject),
  }));

  // actualizar la tabla cuando se agrega un nuevo bloque de horario
  // useEffect(() => {
  //   fetchTimeBlocks();
  // }, [isPopupAddOpen]);

  const columns = [
    { title: "Profesor", field: "teacherName", with: 100, responsive: 2, cellClick: handleCellClick },
    { title: "Curso", field: "courseName", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Asignatura", field: "subjectName", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora Inicio", field: "horaInicio", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora termino", field: "horaTermino", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Dia Semana", field: "diaSemana", width: 200, responsive: 2, cellClick: handleCellClick },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Bloques de Horario</h1>
          <div className="filter-actions">
            {/* <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder={"Filtrar por rut"}
            /> */}
            <Tooltip
              title="Asignar Horario"
              position="top"
              trigger="mouseenter"
            >
              <button
                className={`add-button ${dataTimeBlock.length !== 0 ? "button-disabled" : ""}`}
                onClick={handleAddTimeBlockClick}
                disabled={dataTimeBlock.length !== 0}
              >
                {dataTimeBlock.length !== 0 ? (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip
              title="Editar Horario"
              position="top"
              trigger="mouseenter">
              <button
                className={`edit-button ${dataTimeBlock.length === 0 ? "button-disabled" : ""}`}
                onClick={handleClickUpdate}
                disabled={dataTimeBlock.length === 0}
              >
                {dataTimeBlock.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
            </Tooltip>
            <Tooltip
              title="Eliminar docente"
              position="top"
              trigger="mouseenter"
            >
              <button
                className={`delete-button ${dataTimeBlock.length === 0 ? "button-disabled" : ""
                  }`}
                onClick={() => handleDelete(dataTimeBlock)}
                disabled={dataTimeBlock.length === 0}
              >
                {dataTimeBlock.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <Table
          data={timeBlocksConNombres}
          columns={columns}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupCopiado
        message={messageCopied}
        onClose={() => setMessageCopied("")}
      />
      <PopupAddTimeBlock
        show={isPopupAddOpen}
        setShow={setIsPopupAddOpen}
        dataTimeBlocks={setTimeBlocks}
      />
      <PopupEditTimeBlock
        show={isPopupEditOpen}
        setShow={setIsPopupEditOpen}
        data={dataTimeBlock}
        action={handleUpdate}
      />
    </div>
  );
};

export default TimeBlocks;