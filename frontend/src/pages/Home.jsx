// @pages/Home.jsx
import '../styles/home.css'; // Asegúrate de tener estilos si es necesario

const Home = () => {
  return (
    <>
      <main className="main-content">
        <div className="title-box">
          <h1 className="title">Bienvenidos a PGadminE: Programa gestor administrativo Educacional.</h1>
        </div>

        <section id="services" className="services-section">
          <h2>Servicios</h2>
          <ul>
            <li>Proporcionamos elementos para facilitar la reserva de recursos estudiantiles.</li>
            <li>Permitimos una mejor visualización de los horarios académicos.</li>
            <li>Ante cualquier conflicto no dude en contactarse con nosotros.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Home;
