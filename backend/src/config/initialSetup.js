"use strict";
import User from "../entity/user.entity.js";
import Classroom from "../entity/classroom.entity.js";
import Course from "../entity/course.entity.js";
import Subject from "../entity/subject.entity.js";
import Resource from "../entity/resource.entity.js";
import TimeBlock from "../entity/timeblock.entity.js";
import Teach from "../entity/teach.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

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
          nombreCompleto: "Bastián Alexis Rodríguez Campusano",
          rut: "20.300.745-9",
          email: "profe2.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "999999496",
          rol: "docente",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Marcelo Alfredo Paz Pezo",
          rut: "21.756.745-0",
          email: "profe3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "999999907",
          rol: "docente",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Maria Jesus Sobino Sobino",
          rut: "21.566.241-1",
          email: "profe4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "997766345",
          rol: "docente",
          estado: "regular",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Claudia Jimena Sobino Sobino",
          rut: "20.622.042-2",
          email: "profe5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          telefono: "994754167",
          rol: "docente",
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

async function createCourses() {
  try {
    const courseRepository = AppDataSource.getRepository(Course);

    const count = await courseRepository.count();
    if (count > 0) return;

    await Promise.all([
      courseRepository.save(
        courseRepository.create({
          nombre: "Primero A",
          idBossTeacher: "7",
          idClassroom: "1",
          cantidadAlumnos: "30",
        }),
      ),
      courseRepository.save(
        courseRepository.create({
          nombre: "Tercero A",
          idBossTeacher: "9",
          idClassroom: "2",
          cantidadAlumnos: "40",
        }),
      ),
      courseRepository.save(
        courseRepository.create({
          nombre: "Segundo A",
          idBossTeacher: "10",
          idClassroom: "3",
          cantidadAlumnos: "35",
        }),
      ),
      courseRepository.save(
        courseRepository.create({
          nombre: "Cuarto A",
          idBossTeacher: "12",
          idClassroom: "4",
          cantidadAlumnos: "25",
        }),
      ),
    ]);
    console.log("* => Cursos creados exitosamente");
  } catch (error) {
    console.error("Error al crear cursos:", error);
  }
}

async function createSubject() {
  try {
    const subjectRepository = AppDataSource.getRepository(Subject);

    const count = await subjectRepository.count();
    if (count > 0) return;

    await Promise.all([
      subjectRepository.save(
        subjectRepository.create({
          nombre: "matematicas",
          departamento: "matematica"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "lenguaje",
          departamento: "humanista"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "historia",
          departamento: "humanista"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "biologia",
          departamento: "ciencias"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "musica",
          departamento: "artes"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "artes visuales",
          departamento: "artes"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "quimica",
          departamento: "ciencias"
        }),
      ),
      subjectRepository.save(
        subjectRepository.create({
          nombre: "fisica",
          departamento: "ciencias"
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
          idManager: 8,
        }),
        resourceRepository.create({
          nombre: "Laboratorio de Física",
          estado: "disponible",
          idManager: 8,
        }),
        resourceRepository.create({
          nombre: "Laboratorio de Computación",
          estado: "reservado",
          idManager: 8,
        }),
        resourceRepository.create({
          nombre: "Auditorio",
          estado: "disponible",
          idManager: 8,
        }),
      ]),
    ]);
    console.log("* => Recursos creadas exitosamente");
  } catch (error) {
    console.error("Error al crear recursos:", error);
  }
}

async function createTimeblocks() {
  try {
    const timeBlocksRepository = AppDataSource.getRepository(TimeBlock);

    const count = await timeBlocksRepository.count();
    if (count > 0) return;

    await Promise.all([
      timeBlocksRepository.save(
        timeBlocksRepository.create({
          idTeacher: "9",
          idCourse: "3",
          idSubject: "1",
          horaInicio: "08:00",
          horaTermino: "08:45",
          diaSemana: "Lunes"
        }),
      ),
      timeBlocksRepository.save(
        timeBlocksRepository.create({
          idTeacher: "10",
          idCourse: "3",
          idSubject: "1",
          horaInicio: "08:45",
          horaTermino: "09:30",
          diaSemana: "Miercoles"
        }),
      ),
    ]);
    console.log("* => Bloques de clases creados exitosamente");
  } catch (error) {
    console.error("Error al crear el bloque de tiempo:", error);
  }
}

async function createTeach() {
  try {
    const teachRepository = AppDataSource.getRepository(Teach);

    const count = await teachRepository.count();
    if (count > 0) return;

    await Promise.all([
      teachRepository.save(
        teachRepository.create({
          "idTeacher": "2",
          "idSubject": "1",
          "year": "2024"
        }),
      ),
      teachRepository.save(
        teachRepository.create({
          "idTeacher": "2",
          "idSubject": "2",
          "year": "2024"
        }),
      ),
      teachRepository.save(
        teachRepository.create({
          "idTeacher": "2",
          "idSubject": "3",
          "year": "2024"
        }),
      ),
    ]);
    console.log("* => Relaciones entre docente y asignaturas creados exitosamente");
  } catch (error) {
    console.error("Error al crear el bloque de tiempo:", error);
  }
}

export { createUsers, createClassrooms, createSubject, createResource, createCourses, createTimeblocks, createTeach };