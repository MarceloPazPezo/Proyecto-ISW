// @pages/Root.jsx
import { Link, Outlet } from 'react-router-dom';
import '../styles/styles.css';

const Root = () => {
  return (
    <>
      <header className="header">
        <h1>Bienvenido a Nuestra Aplicación</h1>
        <nav>
          <ul>
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/horarios">Horarios</Link></li>
            <li><Link to="/reserve">Reserva</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
            {/* <li><Link to="/auth">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registro</Link></li> */}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Renderiza el componente hijo según la ruta */}
      </main>
    </>
  );
};

export default Root;
