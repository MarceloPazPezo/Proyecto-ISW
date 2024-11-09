"use strict";
import User from "../entity/user.entity.js";
import Classroom from "../entity/classroom.entity.js";
import Subject from "../entity/subject.entity.js";
import Resource from "../entity/resource.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    // Obtiene los elementos de la BD Tabla -> USers
    const userRepository = AppDataSource.getRepository(User);

    // Revisa si la tabla de la BD esta vacía, si lo esta, crea los usuarios
    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          telefono: "987654321",
          rol: "administrador",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "987654312",
          rol: "usuario",
          estado: "regular",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Nicolas Gomez Morgado",
          rut: "21.279.536-4",
          email: "profe.2024@gmail.cl",
          password: await encryptPassword("profe1234"),
          telefono: "912375312",
          rol: "docente",
          estado: "regular",
        })
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            telefono: "987654123",
            rol: "docente",
            estado: "regular",
          }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "987651234",
          rol: "encargado",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "987612345",
          rol: "jefe de utp",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "987123456",
          rol: "director",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "981234567",
          rol: "usuario",
          estado: "desvinculado",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Eduardo Mago Hermosilla Vidal",
          rut: "18.256.248-8",
          email: "encargado1.2024@gmail.cl",
          password: await encryptPassword("encargado1234"),
          telefono: "925488148",
          rol: "encargado",
          estado: "regular",
        }),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

async function createClassrooms() {
  try {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const count = await classroomRepository.count();
    if (count > 0) return;

    await Promise.all([
      classroomRepository.save(
        classroomRepository.create({
          nombre: "A101AA",
          estado: "ocupada",
        }),
      ),
      classroomRepository.save(
        classroomRepository.create({
          nombre: "A102AA",
          estado: "ocupada",
        }),
      ),
      classroomRepository.save(
        classroomRepository.create({
          nombre: "A103AA",
          estado: "disponible",
        }),
      ),
      classroomRepository.save(
        classroomRepository.create({
          nombre: "A104AA",
          estado: "ocupada",
        }),
      ),
    ]);
    console.log("* => Aulas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear aulas:", error);
  }
}

// ->subject.entity.js
async function createSubject() {
  try {
    const subjectRepository = AppDataSource.getRepository(Subject);

    const count = await subjectRepository.count();
    if (count > 0) return;

    await Promise.all([
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Matemáticas",
          departamento : "Matemáticas"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Lenguaje",
          departamento : "Humanista"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Historia",
          departamento : "Humanista"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Biología",
          departamento : "Ciencias"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Música",
          departamento : "Artes"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Artes Visuales",
          departamento : "Artes"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "Química",
          departamento : "Ciencias"
        }),
      ),
    ]);
    console.log("* => Asignaturas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear asignaturas:", error);
  }
}

async function createResource() {
  try {
    const resourceRepository = AppDataSource.getRepository(Resource);

    const count = await resourceRepository.count();
    if (count > 0) return;

    await Promise.all([
      resourceRepository.save([
        resourceRepository.create({
          nombre: "Laboratorio de Química",
          estado: "disponible",
          manager: 9,
        }),
        resourceRepository.create({
          nombre: "Laboratorio de Física",
          estado: "disponible",
          manager: 9,
        }),
        resourceRepository.create({
          nombre: "Laboratorio de Computación",
          estado: "reservado",
          manager: 9,
        }),
        resourceRepository.create({
          nombre: "Auditorio",
          estado: "disponible",
          manager: 9,
        }),
      ]),
    ]);
    console.log("* => Recursos creadas exitosamente");
  } catch (error) {
    console.error("Error al crear recursos:", error);
  }
}



export { createUsers, createClassrooms, createSubject , createResource };