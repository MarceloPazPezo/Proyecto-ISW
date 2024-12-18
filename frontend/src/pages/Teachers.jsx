import { useCallback, useState } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import Table from "@components/Table";
import useTeachers from "@hooks/users/useGetTeachers.jsx";
import Search from "../components/Search";
import DeleteIcon from "../assets/deleteIcon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import PopupAddTeacher from "../components/PopupAddTeacher";
import PopupEditTeacher from "../components/PopupEditTeacher";
import PopupCopiado from "../components/PopupCopiado";
import PopupTeach from "../components/PopupTeach";
import useAddTeacher from "../hooks/users/useAddTeacher";
import useEditTeacher from "@hooks/users/useEditTeacher";
import useDeleteTeacher from "@hooks/users/useDeleteTeacher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook } from "@fortawesome/free-solid-svg-icons";
import HorarioIcon from "../assets/horarioIcon.svg";

import VentanaHorario from "@components/VentanaHorario";

import "@styles/spreadsheet.css";

const Teachers = () => {
  const { teachers, fetchTeachers, setTeachers } = useTeachers();

  const [filterRut, setFilterRut] = useState("");
  const [messageCopied, setMessageCopied] = useState("");
  const [isVentanaHorarioOpen, setIsVentanaHorarioOpen] = useState(false);
  const [selectedIdTeacher, setSelectedIdTeacher] = useState("");
  const [isPopupTeachOpen, setIsPopupTeachOpen] = useState(false);

  const {
    isPopupAddOpen,
    setIsPopupAddOpen,
    handleAddTeacherClick,
  } = useAddTeacher();

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupEditOpen,
    setIsPopupEditOpen,
    dataTeacher,
    setDataTeacher,
  } = useEditTeacher(setTeachers);

  const { handleDelete } = useDeleteTeacher(
    fetchTeachers,
    setDataTeacher
  );

  const handleRutFilterChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setFilterRut(formattedRut);
  };

  const handleSelectionChange = useCallback((selectedTeacher) => {
    if (selectedTeacher.length > 0) {
      setDataTeacher([selectedTeacher[0]]);
    } else {
      setDataTeacher([]);
    }
}, [setDataTeacher]);

  const formatRut = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, "");
    const dv = cleanRut.slice(-1);
    const number = cleanRut.slice(0, -1);
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedNumber}-${dv}`;
  };

  const handleCellClick = (e, cell) => {
    if (e.ctrlKey) {
      const cellValue = cell.getValue();
      navigator.clipboard
        .writeText(cellValue)
        .then(() => setMessageCopied("Copiado"))
        .catch((err) => console.error("Error al copiar al portapapeles:", err));
    }
  };

  const handleClickTeach = () => {
    if (dataTeacher.length > 0) {
      setIsPopupTeachOpen(true);
    }
  };

  const handleVentanaHorarioOpen = () => {
    if (dataTeacher.length > 0) {
      const selectedID = dataTeacher[0].id;
      console.log("ID seleccionado", selectedID);
      setSelectedIdTeacher(selectedID);
      setIsVentanaHorarioOpen(true);
    }
  };

  const columns = [
    { title: "Rut", field: "rut", width: 100, responsive: 0, cellClick: handleCellClick },
    { title: "Nombre", field: "nombreCompleto", responsive: 2, cellClick: handleCellClick },
    { title: "Correo electrónico", field: "email", responsive: 2, cellClick: handleCellClick },
    { title: "Teléfono", field: "telefono", responsive: 2, cellClick: handleCellClick },
    { title: "Estado", field: "estado", responsive: 2, cellClick: handleCellClick },
    { title: "Creado", field: "createdAt", responsive: 2, cellClick: handleCellClick },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Docentes</h1>
          <div className="filter-actions">
            <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder={"Filtrar por rut"}
            />
            <Tooltip
              title="Agregar docente"
              position="top"
              trigger="mouseenter"
            >
              <button
                className={`add-button ${dataTeacher.length !== 0 ? "button-disabled" : ""
                  }`}
                onClick={handleAddTeacherClick}
                disabled={dataTeacher.length !== 0}
              >
                {dataTeacher.length !== 0 ? (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Editar docente" position="top" trigger="mouseenter">
              <button
                className={`edit-button ${dataTeacher.length === 0 ? "button-disabled" : ""
                  }`}
                onClick={handleClickUpdate}
                disabled={dataTeacher.length === 0}
              >
                {dataTeacher.length === 0 ? (
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
                className={`delete-button ${dataTeacher.length === 0 ? "button-disabled" : ""
                  }`}
                onClick={() => {handleDelete(dataTeacher); setDataTeacher([]); }}
                disabled={dataTeacher.length === 0}
              >
                {dataTeacher.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
            </Tooltip>
            <Tooltip
              title="Asignaturas impartidas"
              position="top"
              trigger="mouseenter"
            >
              <button
                className={`teach-button ${dataTeacher.length === 0 ? "button-disabled" : ""
                  }`}
                onClick={handleClickTeach}
                disabled={dataTeacher.length === 0}
              >
                {dataTeacher.length === 0 ? (
                  <FontAwesomeIcon icon={faBook} style={{ color: "#343965" }} />
                ) : (
                  <FontAwesomeIcon icon={faBook} style={{ color: "#64D7E7" }} />
                )}
              </button>
            </Tooltip>
            <Tooltip
              title="Horario"
              position="top"
              trigger="mouseenter"
            >
              <button
                className={`horario-button ${dataTeacher.length === 0 ? 'button-disabled' : ''}`}
                onClick={handleVentanaHorarioOpen}
                disabled={dataTeacher.length === 0}>
                {dataTeacher.length === 0 ? (
                  <img src={HorarioIcon} alt="delete-disabled" />
                ) : (
                  <img src={HorarioIcon} alt="delete" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <Table
          data={teachers}
          columns={columns}
          filter={filterRut}
          dataToFilter={"rut"}
          initialSortName={"nombreCompleto"}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <VentanaHorario
        isOpen={isVentanaHorarioOpen}
        onClose={() => setIsVentanaHorarioOpen(false)}
        teacherID={selectedIdTeacher}
        teacherName={dataTeacher[0]?.nombreCompleto}
      />
      <PopupCopiado
        message={messageCopied}
        onClose={() => setMessageCopied("")}
      />
      <PopupAddTeacher
        show={isPopupAddOpen}
        setShow={setIsPopupAddOpen}
        dataTeachers={setTeachers}
      />
      <PopupEditTeacher
        show={isPopupEditOpen}
        setShow={setIsPopupEditOpen}
        data={dataTeacher}
        action={handleUpdate}
      />
      <PopupTeach
        show={isPopupTeachOpen}
        setShow={setIsPopupTeachOpen}
        data={dataTeacher}
      />
    </div>
  );
};

export default Teachers;