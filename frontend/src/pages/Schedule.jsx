import { useState } from 'react';

const Horario = () => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const periodos = [
        '08:00 - 08:45',
        '08:45 - 09:30',
        '09:30 - 09:50 (Recreo)',
        '09:50 - 10:35',
        '10:35 - 11:20',
        '11:20 - 11:30 (Recreo)',
        '11:30 - 12:15',
        '12:15 - 13:00',
        '13:00 - 13:55 (Almuerzo)',
        '13:55 - 14:40',
        '14:40 - 15:25',
        '15:25 - 15:30 (Recreo)',
        '15:30 - 16:15',
        '16:15 - 17:00',
        '17:00 - 17:10 (Recreo)',
        '17:10 - 17:55',
        '17:55 - 18:40',
    ];

    const [horarioData, setHorarioData] = useState(
        Array(periodos.length).fill().map(() => Array(dias.length).fill(''))
    );

    const handleInputChange = (diaIdx, periodoIdx, value) => {
        const newData = horarioData.map((row, i) =>
        row.map((col, j) => (i === periodoIdx && j === diaIdx ? value : col))
        );
        setHorarioData(newData);
    };

    const handleDownload = () => {
        const csvRows = [
        ['Periodo', ...dias],
        ...horarioData.map((row, i) => [periodos[i], ...row]),
        ];
        const csvContent = csvRows.map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'horario.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="horario-container">
        <h2>Horario Semanal</h2>
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
            {periodos.map((periodo, i) => (
                <tr
                key={i}
                className={periodo.includes('Recreo') || periodo.includes('Almuerzo') ? 'recreo' : ''}
                >
                <td>{periodo}</td>
                {dias.map((_, j) => (
                    <td key={j}>
                    <input
                        type="text"
                        value={horarioData[i][j]}
                        onChange={(e) => handleInputChange(j, i, e.target.value)}
                        // placeholder="Actividad"
                        disabled={periodo.includes('Recreo') || periodo.includes('Almuerzo')}
                    />
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={handleDownload}>Descargar Horario</button>
        </div>
    );
};

export default Horario;
