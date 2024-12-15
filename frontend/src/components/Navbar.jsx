import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUsers, faClipboardList, faInfoCircle,
    faSignOutAlt, faCalendar, faFileAlt, faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);
    const [docenteMenuOpen, setDocenteMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleAdminMenu = () => {
        setAdminMenuOpen(!adminMenuOpen);
    };

    const toggleDocenteMenu = () => {
        setDocenteMenuOpen(!docenteMenuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
        setAdminMenuOpen(false);
        setDocenteMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink
                            to="/home"
                            onClick={handleLinkClick}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            <FontAwesomeIcon icon={faHome} /> Inicio
                        </NavLink>
                    </li>
                    {(userRole === 'administrador' || userRole === 'director' || userRole === 'jefe de utp') && (
                        <li className="admin-menu">
                            <button
                                onClick={toggleAdminMenu}
                                tabIndex="0"
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleAdminMenu(); }}
                                className={`admin-menu-button ${adminMenuOpen ? 'open' : ''}`}
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                Panel
                                <FontAwesomeIcon icon={faChevronDown} className={`chevron ${adminMenuOpen ? 'rotate' : ''}`} />
                            </button>
                            <ul className={`submenu ${adminMenuOpen ? 'open' : ''}`}>
                                {userRole !== 'jefe de utp' && (
                                    <>
                                        <li>
                                            <NavLink
                                                to="/subjects"
                                                className={({ isActive }) => (isActive ? 'active' : '')}
                                                onClick={handleLinkClick}
                                            >
                                                Asignaturas
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/classrooms"
                                                className={({ isActive }) => (isActive ? 'active' : '')}
                                                onClick={handleLinkClick}
                                            >
                                                Aulas
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/users"
                                                className={({ isActive }) => (isActive ? 'active' : '')}
                                                onClick={handleLinkClick}
                                            >
                                                Usuarios
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <NavLink
                                        to="/teachers"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                        onClick={handleLinkClick}
                                    >
                                        Docentes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/bloquesHorario"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                        onClick={handleLinkClick}
                                    >
                                        Bloques&nbsp;de&nbsp;Horario
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                    {(userRole === 'docente') && (
                        <li className="docente-menu">
                            <button
                                onClick={toggleDocenteMenu}
                                tabIndex="0"
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDocenteMenu(); }}
                                className={`admin-menu-button ${docenteMenuOpen ? 'open' : ''}`}
                            >
                                <FontAwesomeIcon icon={faClipboardList} />
                                Reservas
                                <FontAwesomeIcon icon={faChevronDown} className={`chevron ${docenteMenuOpen ? 'rotate' : ''}`} />
                            </button>
                            <ul className={`submenu ${docenteMenuOpen ? 'open' : ''}`}>
                                <li>
                                    <NavLink
                                        to="/reservation"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                        onClick={handleLinkClick}
                                    >
                                        Disponibles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/myreservation"
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                        onClick={handleLinkClick}
                                    >
                                        Mis Reservas
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                    {userRole === 'docente' && (
                        <>
                            <li>
                                <NavLink
                                    to="/schedule"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faCalendar} /> Horario
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/permisos"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faFileAlt} /> Permisos
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} /> Acerca de
                        </NavLink>
                    </li>
                    <li className="cerrar-sesion">
                        <NavLink
                            to="/auth"
                            onClick={() => {
                                logoutSubmit();
                                setMenuOpen(false);
                            }}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;