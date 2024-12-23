import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);

    useEffect(() => {
        if (tableRef.current) {
            const updatedColumns = [
                { 
                    formatter: "rowSelection",         
                    titleFormatter: false,             
                    hozAlign: "middle",
                    headerSort: false,                 
                    width: 50,                         
                    cellClick: function (e, cell) {   
                        e.stopPropagation(); 
                        cell.getRow().toggleSelect();
                    },
                    resizable: false
                },
                ...columns.map(col => ({ ...col, resizable: false}))
            ];
            
            const tabulatorTable = new Tabulator(tableRef.current, {
                data: [],
                columns: updatedColumns,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: 1,
                rowHeight: 50,
                langs: {
                    "default": {
                        "pagination": {
                            "first": "<< Primero",
                            "prev": "< Anterior",
                            "next": "Siguiente >",
                            "last": "Último >>",
                        }
                    }
                },
                initialSort: [
                    { column: initialSortName, dir: "asc" }
                ],
            });
            
            tabulatorTable.on("cellClick", function(e, cell) {
                if (cell.getColumn().getField() === "checkbox") { 
                    cell.getRow().toggleSelect(); 
                }
            });

            tabulatorTable.on("rowSelectionChanged", function(selectedData) {
                if (onSelectionChange) {
                    onSelectionChange(selectedData);
                }
            });
            
            tabulatorTable.on("tableBuilt", function() {
                setIsTableBuilt(true);
            });
            setTable(tabulatorTable);
            return () => {
                tabulatorTable.destroy();
                setIsTableBuilt(false);
                setTable(null);
            };
        }
    }, []);

    useEffect(() => {
        if (table && isTableBuilt) {
            table.replaceData(data);
        }
    }, [data, table, isTableBuilt]);

    useEffect(() => {
        if (table && isTableBuilt) {
            if (filter) {
                table.setFilter(dataToFilter, "like", filter);
            } else {
                table.clearFilter();
            }
            table.redraw();
        }
    }, [filter, table, dataToFilter, isTableBuilt]);

    return { tableRef };
}
export default useTable;