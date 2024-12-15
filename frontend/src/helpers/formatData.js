import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        estado: startCase(user.estado),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatResourceData (resource) {
    return {
        ...resource,
        nombre: resource.nombre.toUpperCase(),
        estado: startCase(resource.estado),
        createdAt: formatTempo(resource.createdAt, "DD-MM-YYYY")
    };
}

export function formatClassroomData(classroom) {
    return {
        ...classroom,
        nombre: classroom.nombre.toUpperCase(),
        estado: startCase(classroom.estado),
        capacidad: classroom.capacidad,
        createdAt: formatTempo(classroom.createdAt, "DD-MM-YYYY")
    };
}

export function formatSubjectData(subject) {
    return {
        ...subject,
        nombre: startCase(subject.nombre),
        departamento: startCase(subject.departamento),
        createdAt: formatTempo(subject.createdAt, "DD-MM-YYYY")
    };
}

export function formatCourseData(course) {
    return {
        ...course,
        nombre: startCase(course.nombre),
        idBossTeacher: startCase(course.idBossTeacher),
        idClassroom: startCase(course.idClassroom),
        createdAt: formatTempo(course.createdAt, "DD-MM-YYYY")
    };
}
export function formatTimeBlockData(timeblock) {
    return {
        ...timeblock,
        idTeacher: timeblock.idTeacher,
        idCourse: timeblock.idCourse,
        idSubject: timeblock.idSubject,
        horaInicio: timeblock.horaInicio,
        horaTermino: timeblock.horaTermino,
        fecha: formatTempo(timeblock.fecha, "DD-MM-YYYY")
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function quitarAcentos(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
    }
    return obj;
}

export function formatPostUpdate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        estado: startCase(user.estado),
        telefono: user.telefono,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostUpdateClassroom(classroom) {
    return {
        nombre: classroom.nombre.toUpperCase(),
        estado: startCase(classroom.estado),
        capacidad: classroom.capacidad,
        createdAt: formatTempo(classroom.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostUpdateSubject(subject) {
    return {
        nombre: startCase(subject.nombre),
        departamento: startCase(subject.departamento),
        createdAt: formatTempo(subject.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostUpdateCourse(course) {
    return {
        nombre: startCase(course.nombre),
        idBossTeacher: startCase(course.idBossTeacher),
        idClassroom: startCase(course.idClassroom),
        createdAt: formatTempo(course.createdAt, "DD-MM-YYYY")
    };
}

export function formatPostUpdateResource(resource) {
    return {
        nombre: resource.nombre.toUpperCase(),
        estado: startCase(resource.estado),
        idManager: resource.idManager,
        createdAt: formatTempo(resource.createdAt, "DD-MM-YYYY")
    };
}
