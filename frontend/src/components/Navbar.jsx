import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faClipboardList, faInfoCircle, faSignOutAlt, faCalendar, faFileAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { set } from "react-hook-form";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
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

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
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
        removeActiveClass();
        addActiveClass();
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink
                            to="/home"
                            onClick={handleLinkClick}
                            activeClassName="active"
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
                                    <li>
                                        <NavLink to="/classrooms" activeClassName="active" onClick={handleLinkClick}>
                                            Aulas
                                        </NavLink>
                                    </li>
                                )}
                                {userRole !== 'jefe de utp' && (
                                    <li>
                                        <NavLink to="/users" activeClassName="active" onClick={handleLinkClick}>
                                            Usuarios
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/teachers" activeClassName="active" onClick={handleLinkClick}>
                                        Docentes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/asignarBloque" activeClassName="active" onClick={handleLinkClick}>
                                        AgregarHorario
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/bloquesHorario" activeClassName="active" onClick={handleLinkClick}>
                                        Bloques
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
                                <NavLink to="/reservation" activeClassName="active" onClick={handleLinkClick}>
                                    <FontAwesomeIcon/> Disponibles
                                </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/myreservation" activeClassName="active" onClick={handleLinkClick}>
                                        <FontAwesomeIcon/> Mis Reservas
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                    {(userRole === 'encargado') && (
                    <li>
                        <NavLink
                            to="/reservation"
                            onClick={handleLinkClick}
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faClipboardList} /> Reserva
                        </NavLink>
                    </li>
                    )}
                    {userRole === 'docente' && (
                        <li>
                            <NavLink
                                to="/schedule"
                                onClick={handleLinkClick}
                                activeClassName="active"
                            >
                                <FontAwesomeIcon icon={faCalendar} /> Horario
                            </NavLink>
                        </li>
                    )}
                    {userRole === 'docente' && (
                        <li>
                            <NavLink
                                to="/permisos"
                                onClick={handleLinkClick}
                                activeClassName="active"
                            >
                                <FontAwesomeIcon icon={faFileAlt} /> Permisos
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/about"
                            onClick={handleLinkClick}
                            activeClassName="active"
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
                            activeClassName="active"
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