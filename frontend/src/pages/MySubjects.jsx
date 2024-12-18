import { useCallback, useState } from "react";
import Table from "@components/Table";
import useTeachesByTeacher from "@hooks/teach/useGetTeachesByTeacher";
import Search from "../components/Search";
import PopupCopiado from "../components/PopupCopiado";
import "react-tippy/dist/tippy.css";
import "@styles/spreadsheet.css";

const MySubjects = () => {
    const savedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const { subjectsByTeacher } = useTeachesByTeacher(savedUser.rut);
    const [filterDepartamento, setFilterDepartamento] = useState("");
    const [messageCopied, setMessageCopied] = useState("");

    const handleDepartamentoFilterChange = (e) => {
        const value = e.target.value;
        setFilterDepartamento(value);
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

    const columns = [
        {
            title: "Nombre",
            field: "label",
            responsive: 2,
            cellClick: handleCellClick,
        },
        {
            title: "Estado",
            field: "departamento",
            responsive: 0,
            cellClick: handleCellClick,
        }
    ];

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Mis asignaturas</h1>
                    <div className="filter-actions">
                        <Search
                            value={filterDepartamento}
                            onChange={handleDepartamentoFilterChange}
                            placeholder={"Filtrar por departamento"}
                        />
                    </div>
                </div>
                <Table
                    data={subjectsByTeacher}
                    columns={columns}
                    filter={filterDepartamento}
                    dataToFilter={"label"}
                    initialSortName={"label"}
                />
            </div>
            <PopupCopiado
                message={messageCopied}
                onClose={() => setMessageCopied("")}
            />
        </div>
    );
};

export default MySubjects;
