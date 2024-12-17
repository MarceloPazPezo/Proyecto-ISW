import { useState, useEffect } from 'react';
import useGetTimeBlocks from '../hooks/timeblocks/useGetTimeBlocks';
import useGetSubjects from '../hooks/subjects/useGetSubjects';
import useGetCourses from '../hooks/courses/useGetCourses';
import '@styles/horarioUser.css';


function Schedule() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diasSinTilde = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    const { timeblocks } = useGetTimeBlocks();
    const { subjects } = useGetSubjects();
    const { courses } = useGetCourses();

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Leer el valor del sessionStorage al montar el componente
        const usuarioAlmacenado = sessionStorage.getItem('usuario');
        // console.log('Usuario almacenado:', usuarioAlmacenado);
        if (usuarioAlmacenado) {
            // Se parsea de JSON a objeto de JavaScript
            setUsuario(JSON.parse(usuarioAlmacenado));
        }
    }, []); // dependencia vacía => solo se ejecuta al montar

    const varID = usuario?.id;
    // console.log("ID del usuario:", varID);

    const generateTableRows = () => {
        // console.log("tipo de dato de varID:", typeof varID);

        const teacherTimeblocks = timeblocks.filter(timeblock => timeblock.idTeacher === varID);
        console.log("Bloques de tiempo asociados al docente", teacherTimeblocks);

        const subjectMapUSer = Object.fromEntries(subjects.map(subject => [subject.id, subject.nombre]));
        const courseMapUser = Object.fromEntries(courses.map(course => [course.id, course.nombre]));

        const rows = [];

        // Definir todos los períodos predefinidos con formato HH:MM
        const predefinedPeriodsUser = [
            { horaInicio: "08:00", horaTermino: "08:45" },
            { horaInicio: "08:45", horaTermino: "09:30" },
            { horaInicio: "09:30", horaTermino: "09:50" }, // recreo
            { horaInicio: "09:50", horaTermino: "10:35" },
            { horaInicio: "10:35", horaTermino: "11:20" },
            { horaInicio: "11:20", horaTermino: "11:30" }, // recreo
            { horaInicio: "11:30", horaTermino: "12:15" },
            { horaInicio: "12:15", horaTermino: "13:00" },
            { horaInicio: "13:00", horaTermino: "13:55" }, // almuerzo
            { horaInicio: "13:55", horaTermino: "14:40" },
            { horaInicio: "14:40", horaTermino: "15:25" },
            { horaInicio: "15:25", horaTermino: "15:30" }, // recreo
            { horaInicio: "15:30", horaTermino: "16:15" },
            { horaInicio: "16:15", horaTermino: "17:00" },
            { horaInicio: "17:00", horaTermino: "17:10" }, // recreo
            { horaInicio: "17:10", horaTermino: "17:55" },
            { horaInicio: "17:55", horaTermino: "18:40" }
        ];

        for (let i = 0; i < predefinedPeriodsUser.length; i++) {
            const period = predefinedPeriodsUser[i];
            const isBreak = period.horaInicio === "09:30" || period.horaInicio === "11:20" ||
                period.horaInicio === "13:00" || period.horaInicio === "15:25" ||
                period.horaInicio === "17:00";
            const rowClass = isBreak ? "break-row-user" : "";
            const row = [];
            row.push(
                <td key={`period-user-${i}`} className={`period-cell-user ${rowClass}`}>
                    {`${period.horaInicio} - ${period.horaTermino}`}
                </td>
            );
            for (let j = 0; j < diasSinTilde.length; j++) {
                const dia = diasSinTilde[j];
                const periodoInicio = predefinedPeriodsUser[i].horaInicio;
                const periodoTermino = predefinedPeriodsUser[i].horaTermino;

                // Formatear las horas de los bloques de tiempo a HH:MM
                const matchingTimeblocks = teacherTimeblocks.filter(tb => {
                    const tbInicio = tb.horaInicio.slice(0, 5); // "HH:MM"
                    const tbTermino = tb.horaTermino.slice(0, 5); // "HH:MM"
                    return tb.diaSemana === dia && tbInicio === periodoInicio && tbTermino === periodoTermino;
                });

                if (matchingTimeblocks.length > 0) {
                    row.push(
                        <td key={`dia-user-${j}`}>
                            {matchingTimeblocks.map(tb => {
                                const subjectName = subjectMapUSer[tb.idSubject] || 'Desconocido';
                                // Normaliza el nombre de la asignatura para que coincida con la clase CSS
                                const subjectClass = `asignatura-user-${subjectName.toLowerCase().replace(/\s+/g, '-')}`;

                                return (
                                    <div
                                        key={tb.id}
                                        className={`horario-cell-user ${subjectClass}`}
                                    >
                                        <span>{`${subjectName} ${courseMapUser[tb.idCourse]}`}</span>
                                    </div>
                                );
                            })}
                        </td>
                    );
                } else {
                    row.push(<td key={`dia-${j}`}></td>);
                }
            }
            rows.push(
                <tr key={`row-user-${i}`} className={isBreak ? 'break-row-user' : ''}>
                    {row}
                </tr>
            );
        }
        return rows;
    };

    return (
        <div className="schedule-ventana-horario">
            <div className="schedule-contenido">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Periodo</th>
                            {dias.map((dia, i) => (
                                <th key={i}>{dia}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {generateTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Schedule;    