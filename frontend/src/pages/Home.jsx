// @pages/Home.jsx
import '../styles/home.css'; // Asegúrate de tener estilos si es necesario

const Home = () => {
  return (
    <>
      <main className="main-content">
        <section id="about" className="about-section">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una empresa dedicada a ofrecer soluciones innovadoras para mejorar tu vida.
          </p>
        </section>

        <section id="services" className="services-section">
          <h2>Servicios</h2>
          <ul>
            <li>Servicio 1: Descripción del servicio 1.</li>
            <li>Servicio 2: Descripción del servicio 2.</li>
            <li>Servicio 3: Descripción del servicio 3.</li>
          </ul>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contacto</h2>
          <form>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="message">Mensaje:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Home;
