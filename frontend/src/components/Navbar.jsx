import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faClipboardList, faInfoCircle, faSignOutAlt, faCalendar, faFileAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
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

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faHome} /> Inicio
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                        <li className="admin-menu">
                            <span onClick={toggleAdminMenu}>
                                <FontAwesomeIcon icon={faUsers} />
                                Panel
                                <FontAwesomeIcon icon={faChevronDown} className={`chevron ${adminMenuOpen ? 'rotate' : ''}`} />
                            </span>
                            <ul className={`submenu ${adminMenuOpen ? 'open' : ''}`}>
                                <li>
                                    <NavLink to="/users" activeClassName="active">
                                        Usuarios
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/rooms" activeClassName="active">
                                        Salas
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/teachers" activeClassName="active">
                                        Docentes
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <NavLink 
                            to="/reservation" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faClipboardList} /> Reserva
                        </NavLink>
                    </li>
                    {userRole !== 'administrador' && (
                    <li>
                        <NavLink 
                            to="/schedule" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faCalendar} /> Horario
                        </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink 
                            to="/permisos" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faFileAlt} /> Permisos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/about" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
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