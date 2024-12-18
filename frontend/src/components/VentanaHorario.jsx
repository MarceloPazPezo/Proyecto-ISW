import { useEffect } from 'react';
import useGetTimeBlocks from '../hooks/timeblocks/useGetTimeBlocks';
import useGetSubjects from '../hooks/subjects/useGetSubjects';
import useGetCourses from '../hooks/courses/useGetCourses';
import '@styles/popupHorario.css';
import html2canvas from 'html2canvas';

const VentanaHorario = ({ isOpen, onClose, teacherID }) => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diasSinTilde = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    const { timeblocks } = useGetTimeBlocks();
    const { subjects } = useGetSubjects();
    const { courses } = useGetCourses();

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleDownload = () => {
        const table = document.querySelector('.ventana-horario table');
        const tfoot = table.querySelector('tfoot');

        // Ocultar temporalmente el tfoot
        if (tfoot) tfoot.style.display = 'none';

        // Capturar la tabla con html2canvas
        html2canvas(table).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // Crear y descargar la imagen
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'horario.png';
            a.click();

            // Volver a mostrar el tfoot
            if (tfoot) tfoot.style.display = '';
        });
    };




    if (!isOpen) return null;

    // const teacherTimeblocks = timeblocks.filter(timeblock => timeblock.idTeacher === teacherID);
    // console.log("id del docente recibido", teacherID);
    // console.log("bloques de tiempo asociado al docente", teacherTimeblocks);

    // const teacherSubject = teacherTimeblocks.map(timeblock => timeblock.idSubject);
    // const teacherCourse = teacherTimeblocks.map(timeblock => timeblock.idCourse);

    // const diasBloques = teacherTimeblocks.map(timeblock => timeblock.diaSemana);
    // console.log("Días de los bloques de tiempo del docente:", diasBloques);

    // const subjectMap = Object.fromEntries(subjects.map(subject => [subject.id, subject.nombre]));
    // const courseMap = Object.fromEntries(courses.map(course => [course.id, course.nombre]));

    // const teacherSubjectNames = teacherSubject.map(id => subjectMap[id] || 'Desconocido');
    // const teacherCourseNames = teacherCourse.map(id => courseMap[id] || 'Desconocido');

    // console.log("Materias del docente:", teacherSubjectNames);
    // console.log("Cursos del docente:", teacherCourseNames);

    const generateTableRows = () => {
        const teacherTimeblocks = timeblocks.filter(timeblock => timeblock.idTeacher === teacherID);
        // console.log("Bloques de tiempo asociados al docente", teacherTimeblocks);

        const subjectMap = Object.fromEntries(subjects.map(subject => [subject.id, subject.nombre]));
        const courseMap = Object.fromEntries(courses.map(course => [course.id, course.nombre]));

        const rows = [];

        // Definir todos los períodos predefinidos con formato HH:MM
        const predefinedPeriods = [
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

        for (let i = 0; i < predefinedPeriods.length; i++) {
            const period = predefinedPeriods[i];
            const isBreak = period.horaInicio === "09:30" || period.horaInicio === "11:20" ||
                period.horaInicio === "13:00" || period.horaInicio === "15:25" ||
                period.horaInicio === "17:00";
            const rowClass = isBreak ? "break-row" : "";
            const row = [];
            row.push(
                <td key={`period-${i}`} className={`period-cell ${rowClass}`}>
                    {`${period.horaInicio} - ${period.horaTermino}`}
                </td>
            );
            for (let j = 0; j < diasSinTilde.length; j++) {
                const dia = diasSinTilde[j];
                const periodoInicio = predefinedPeriods[i].horaInicio;
                const periodoTermino = predefinedPeriods[i].horaTermino;

                // Formatear las horas de los bloques de tiempo a HH:MM
                const matchingTimeblocks = teacherTimeblocks.filter(tb => {
                    const tbInicio = tb.horaInicio.slice(0, 5); // "HH:MM"
                    const tbTermino = tb.horaTermino.slice(0, 5); // "HH:MM"
                    return tb.diaSemana === dia && tbInicio === periodoInicio && tbTermino === periodoTermino;
                });

                if (matchingTimeblocks.length > 0) {
                    row.push(
                        <td key={`dia-${j}`}>
                            {matchingTimeblocks.map(tb => {
                                const subjectName = subjectMap[tb.idSubject] || 'Desconocido';
                                // Normaliza el nombre de la asignatura para que coincida con la clase CSS
                                const subjectClass = `asignatura-${subjectName.toLowerCase().replace(/\s+/g, '-')}`;

                                return (
                                    <div
                                        key={tb.id}
                                        className={`horario-cell ${subjectClass}`}
                                    >
                                        <span>{`${subjectName} ${courseMap[tb.idCourse]}`}</span>
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
                <tr key={`row-${i}`} className={isBreak ? 'break-row' : ''}>
                    {row}
                </tr>
            );
        }
        return rows;
    };

    return (
        <div className="ventana-horario">
            <div className="contenido">
                <table>
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
                    <tfoot>
                        <tr>
                            <td colSpan={dias.length + 1}>
                                <button onClick={handleDownload}>Descargar Horario</button>
                                <button onClick={onClose}>Cerrar</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default VentanaHorario;
