import { useCallback, useState } from "react";
import { Tooltip } from "react-tippy";
import Table from "@components/Table";
import useClassrooms from "@hooks/classrooms/useGetClassrooms";
import Search from "../components/Search";
import PopupAddClassroom from "../components/PopupAddClassroom";
import PopupEditClassroom from "../components/PopupEditClassroom";
import PopupCopiado from "../components/PopupCopiado";
import DeleteIcon from "../assets/deleteIcon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import useAddClassroom from "@hooks/classrooms/useAddClassroom";
import useEditClassroom from "@hooks/classrooms/useEditClassroom";
import useDeleteClassroom from "@hooks/classrooms/useDeleteClassroom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-tippy/dist/tippy.css";
import "@styles/spreadsheet.css";

const Classrooms = () => {
    const { classrooms, fetchClassrooms, setClassrooms } = useClassrooms();
    const [filterEstado, setFilterEstado] = useState("");
    const [messageCopied, setMessageCopied] = useState("");
    const {
        isPopupAddOpen,
        setIsPopupAddOpen,
        handleAddClassroomClick
    } = useAddClassroom();

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataClassroom,
        setDataClassroom,
    } = useEditClassroom(setClassrooms);

    const { handleDelete } = useDeleteClassroom(
        fetchClassrooms,
        setDataClassroom
    );

    const handleEstadoFilterChange = (e) => {
        const value = e.target.value;
        setFilterEstado(value);
    };

    const handleSelectionChange = useCallback((selectedClassroom) => {
        if (selectedClassroom.length > 0) {
            setDataClassroom([selectedClassroom[0]]);
        } else {
            setDataClassroom([]);
        }
    }, [setDataClassroom]);

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
        {
            title: "Nombre",
            field: "nombre",
            responsive: 2,
            cellClick: handleCellClick,
        },
        {
            title: "Estado",
            field: "estado",
            responsive: 0,
            cellClick: handleCellClick,
        },
        {
            title: "Capacidad",
            field: "capacidad",
            responsive: 0,
            cellClick: handleCellClick,
        },
        {
            title: "Creado",
            field: "createdAt",
            responsive: 0,
            cellClick: handleCellClick,
        },
    ];

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Aulas</h1>
                    <div className="filter-actions">
                        <Search
                            value={filterEstado}
                            onChange={handleEstadoFilterChange}
                            placeholder={"Filtrar por estado"}
                        />
                        <Tooltip title="Agregar Aula" position="top" trigger="mouseenter">
                            <button
                                className={`add-classroom-button ${dataClassroom.length !== 0 ? "button-disabled" : ""
                                    }`}
                                onClick={handleAddClassroomClick}
                                disabled={dataClassroom.length !== 0}
                            >
                                {dataClassroom.length !== 0 ? (
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#3E3478" }} />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#64D7E7" }} />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip title="Editar aula" position="top" trigger="mouseenter">
                            <button
                                className={`edit-classroom-button ${dataClassroom.length === 0 ? "button-disabled" : ""
                                    }`}
                                onClick={handleClickUpdate}
                                disabled={dataClassroom.length === 0}
                            >
                                {dataClassroom.length === 0 ? (
                                    <img src={UpdateIconDisable} alt="edit-disabled" />
                                ) : (
                                    <img src={UpdateIcon} alt="edit" />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip title="Eliminar aula" position="top" trigger="mouseenter">
                            <button
                                className={`delete-user-button ${dataClassroom.length === 0 ? "button-disabled" : ""
                                    }`}
                                onClick={() => {handleDelete(dataClassroom); setDataClassroom([]); }}
                                disabled={dataClassroom.length === 0}
                            >
                                {dataClassroom.length === 0 ? (
                                    <img src={DeleteIconDisable} alt="delete-disabled" />
                                ) : (
                                    <img src={DeleteIcon} alt="delete" />
                                )}
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <Table
                    data={classrooms}
                    columns={columns}
                    filter={filterEstado}
                    dataToFilter={"estado"}
                    initialSortName={"nombre"}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupAddClassroom
                show={isPopupAddOpen}
                setShow={setIsPopupAddOpen}
                dataClassrooms={setClassrooms}
            />
            <PopupEditClassroom
                show={isPopupEditOpen}
                setShow={setIsPopupEditOpen}
                data={dataClassroom}
                action={handleUpdate}
            />
            <PopupCopiado
                message={messageCopied}
                onClose={() => setMessageCopied("")}
            />
        </div>
    );
};

export default Classrooms;
