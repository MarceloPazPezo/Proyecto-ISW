import Table from '@components/Table';
import { useState, useEffect } from 'react';
import { Tooltip } from "react-tippy";
// import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
// import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import PopupCopiado from '../components/PopupCopiado';
import PopupAddTimeBlock from '../components/PopupAddTimeBlock';
import useGetTimeBlocks from '../hooks/timeblocks/useGetTimeBlocks';
import useGetSubjects from '../hooks/subjects/useGetSubjects';
import useGetCourses from '../hooks/courses/useGetCourses';
import useGetTeachers from '../hooks/users/useGetTeachers';
import useAddTimeBlock from '../hooks/timeblocks/useAddTimeBlock';
import useEditTimeBlock from '../hooks/timeblocks/useEditTimeBlock';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/horarios.css';

const TimeBlocks = () => {
  const {
    timeblocks,
    fetchTimeBlocks,
    setTimeBlocks
  } = useGetTimeBlocks();

  const {
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddTimeBlockClick
  } = useAddTimeBlock();

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataTimeBlock,
    setDataTimeBlock
  } = useEditTimeBlock(setTimeBlocks);

  const {
    subjects,
  } = useGetSubjects();

  const {
    courses,
  } = useGetCourses();

  const {
    teachers,
  } = useGetTeachers();

  const [messageCopied, setMessageCopied] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCellClick = (e, cell) => {
    const row = cell.getRow();
    if (e.altKey) {
      if (row.isSelected()) {
        row.deselect();
        setSelectedRow(null);
      } else {
        const tableRows = row.getTable().getRows();
        tableRows.forEach(r => r.deselect());
        row.select();
        setSelectedRow(row.original);
      }
    } else if (e.ctrlKey) {
      const cellValue = cell.getValue();
      navigator.clipboard.writeText(cellValue)
        .then(() => setMessageCopied('Copiado'))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
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
  useEffect(() => {
    fetchTimeBlocks();
  }, [isPopupAddOpen]);

  const columns = [
    { title: "Profesor", field: "teacherName", with: 100, responsive: 2, cellClick: handleCellClick },
    { title: "Curso", field: "courseName", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Asignatura", field: "subjectName", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora Inicio", field: "horaInicio", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Hora termino", field: "horaTermino", width: 200, responsive: 2, cellClick: handleCellClick },
    { title: "Dia Semana", field: "diaSemana", width: 200, responsive: 2, cellClick: handleCellClick },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Bloques de Horario</h1>
          <div className='filter-actions'>
            <Tooltip title="Asignar horario" position="top" trigger="mouseenter">
              <button
                className="button-add"
                onClick={() => setIsPopupAddOpen(true)}
                disabled={selectedRow !== null}
              >
                {dataTimeBlock.length !== 0 ? (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Editar bloque" position="top" trigger="mouseenter">
              <button className={`edit-button ${dataTimeBlock.length === 0 ? "button-disabled" : ""}`}
                onClick={() => setIsPopupOpen(true)}
                disabled={selectedRow === null}
              >                {dataTimeBlock.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
              </button>
            </Tooltip>
          </div>
        </div>
        <Table
          data={timeBlocksConNombres}
          columns={columns}
        />
      </div>
      <PopupCopiado
        message={messageCopied}
        onClose={() => setMessageCopied("")}
      />
      <PopupAddTimeBlock
        isOpen={isPopupAddOpen}
        onClose={() => setIsPopupAddOpen(false)}
      />
    </div>
  );
};

export default TimeBlocks;