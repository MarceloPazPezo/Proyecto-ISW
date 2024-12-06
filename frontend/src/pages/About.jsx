const About = () => {
    return (
        <>
        <main className="main-content">
            <section id="about" className="about-section">
            <h2>Sobre Nosotros</h2>
            <p>
                Somos una empresa dedicada a ofrecer soluciones innovadoras para mejorar tu vida.
            </p>
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
                <input type="text" id="email" name="email" required />
                </div>
                <div>
                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
            </section>
        </main>
        </>
    );
};

export default About;
