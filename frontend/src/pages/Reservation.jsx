import '@styles/reservation.css';

const Reservation = () => {
    const elementsToReserve = [
        { id: 1, name: "Aula 101", capacity: 30, reserved: false },
        { id: 2, name: "Aula 102", capacity: 25, reserved: false },
        { id: 3, name: "Laboratorio de Ciencias", capacity: 20, reserved: true },
        { id: 4, name: "Sala de Computación", capacity: 15, reserved: false },
        { id: 5, name: "Auditorio", capacity: 100, reserved: true },
        { id: 6, name: "Libros de ciencia", capacity: 50, reserved: false }
    ];

    return (
        <div className="main-container">
        <div className="reservation-container">
        <h1>Reservas de Espacios</h1>
        <table className="reservation-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {elementsToReserve.map((element) => (
                <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.capacity}</td>
                <td>{element.reserved ? "Reservado" : "Disponible"}</td>
                <td>
                    <button disabled={element.reserved}>Reservar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </div>
    );
};

export default Reservation;

