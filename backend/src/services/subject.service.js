"use strict";
import Subject from "../entity/subject.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getSubjectService(query) { // Buscar asignatura especifica
    try {
        const { id, nombre, departamento } = query;
        const subjectRepository = AppDataSource.getRepository(Subject);
        console.log(query);

        // Buscar asignatura que coincida con 'nombre' y 'departamento'
        const subjectFound = await subjectRepository.findOne({
            where: { id: id, nombre: nombre, departamento: departamento },
        });

        console.log(subjectFound);

        if (!subjectFound) return [null, "Asignatura no encontrada"];

        return [subjectFound, null];
    } catch (error) {
        console.error("Error obtener la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function getSubjectsService() { // Buscar asignatura especifica
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);

        const subjects = await subjectRepository.find();

        if (!subjects || subjects.length === 0) return [null, "No hay asignaturas"];

        return [subjects, null]; // Devuelve las asignaturas y null para el error
    } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateSubjectsService(query, body) { // Buscar asignatura especifica
    try {
        const { id, nombre } = query; // identificadores únicos

        const subjectRepository = AppDataSource.getRepository(Subject);

        const subjectFound = await subjectRepository.findOne({
            where: [{ id: id }, { nombre: nombre }], 
        });

        if (!subjectFound) return [null, "Asignatura no encontrada"];

        const existingSubject = await subjectRepository.findOne({
            where: [{ id: body.id }, { nombre : body.nombre }],
        });

        if (existingSubject && existingSubject.id !== subjectFound.id) {
            return [null, "La asignatura ya existe"];
        }

        const dataSubjectUpdate = {
            nombre: body.nombre,
            departamento: body.departamento,
            updatedAt: new Date(),
        }

        await subjectRepository.update({ id: subjectFound.id }, dataSubjectUpdate);

        const subjectData = await subjectRepository.findOne({
            where: { id: subjectFound.id },
        });

        if (!subjectData) return [null, "Error al actualizar la asignatura"];

        return [null];
    } catch (error) {
        console.error("Error al modificar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteSubjectService(query) { 
    try {
        const { id, nombre } = query; // identificadores únicos

        const subjectRepository = AppDataSource.getRepository(Subject);

        const subjectFound = await subjectRepository.findOne({
            where: [{ id: id }, { nombre: nombre }], 
        });

        if (!subjectFound) return [null, "Asignatura no encontrada"];

        console.log(subjectFound);
        
        const deletedSubject = await subjectRepository.delete({ nombre: subjectFound.nombre });

        console.log(deletedSubject);

        return [deletedSubject, null];
    } catch (error) {
        console.error("Error al eliminar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createSubjectService(query) {
    try {

        const { nombre } = query;

        const subjectRepository = AppDataSource.getRepository(Subject);

        const existingSubject = await subjectRepository.findOne({
            where: [{ nombre: nombre }],
        });

        if (existingSubject) {
            return [null, "La asignatura ya existe"];
        }

        const newSubject = subjectRepository.create({
            nombre: query.nombre,
            departamento: query.departamento,
        });

        const subjectSaved = await subjectRepository.save(newSubject);  

        return [subjectSaved, null];
    } catch (error) {
        console.error("Error al eliminar la asignatura:", error);
        return [null, "Error interno del servidor"];
    }
}