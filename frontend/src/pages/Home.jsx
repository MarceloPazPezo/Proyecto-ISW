import React, { useEffect, useState } from "react";
import { startCase } from 'lodash';

const Home = () => {
  const [userData, setUserData] = useState({ nombreCompleto: "", rol: "" });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        nombreCompleto: startCase(parsedUser.nombreCompleto),
        rol: startCase(parsedUser.rol),
      });
    }
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="title-box">
          <h1 className="title">
            Bienvenidos a PGadminE: Programa gestor administrativo Educacional.
          </h1>

        </div>

        <section id="services" className="services-section">
          <h2>Información del Usuario</h2>
          <ul>
            <li><strong>Nombre:</strong> {userData.nombreCompleto}</li>
            <li><strong>Rol:</strong> {userData.rol}</li>
          </ul>
          <h2>Servicios</h2>
          <ul>
            <li>Proporcionamos elementos para facilitar la reserva de recursos estudiantiles.</li>
            <li>Permitimos una mejor visualización de los horarios académicos.</li>
            <li>Ante cualquier conflicto no dude en contactarse con nosotros.</li>
          </ul>
        </section>

      </div>
    </>
  );
};

export default Home;
