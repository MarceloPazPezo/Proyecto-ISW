"use strict";
import Joi from "joi";

export const timeBlockQueryValidation = Joi.object({
    idTeacher: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    idCourse: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    idSubject: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    horaInicio: Joi.string()
        .required()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .messages({
            "string.empty": "La hora de inicio no puede estar vacía.",
            "string.pattern.base": "La hora de inicio debe estar en formato HH:MM de 24 horas.",
        }),
    horaTermino: Joi.string()
        .required()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .messages({
            "string.empty": "La hora de termino no puede estar vacía.",
            "string.pattern.base": "La hora de término debe estar en formato HH:MM de 24 horas.",
        }),
    fecha: Joi.string()
        .required()
        .pattern(/^\d{2}-\d{2}-\d{4}$/)
        .messages({
            "string.empty": "La fecha no puede estar vacía.",
            "string.pattern.base": "La fecha debe estar en formato DD-MM-YYYY.",
        }),
})
    .or("idTeacher", "idCourse", "idSubject", "fecha")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos: idTeacher, idCourse, idSubject o fecha",
    });

export const timeBlockBodyValidation = Joi.object({
    idTeacher: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            "number.empty": "El id del profesor no puede estar vacío.",
            "number.base": "El id del profesor debe ser un número.",
            "number.integer": "El id del profesor debe ser un número entero.",
            "number.positive": "El id del profesor debe ser un número positivo.",
        }),
    idCourse: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    idSubject: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    horaInicio: Joi.string()
        .required()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .messages({
            "string.empty": "La hora de inicio no puede estar vacía.",
            "string.pattern.base": "La hora de inicio debe estar en formato HH:MM de 24 horas.",
        }),
    horaTermino: Joi.string()
        .required()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .messages({
            "string.empty": "La hora de termino no puede estar vacía.",
            "string.pattern.base": "La hora de término debe estar en formato HH:MM de 24 horas.",
        }),
    fecha: Joi.string()
        .required()
        .pattern(/^\d{2}-\d{2}-\d{4}$/)
        .messages({
            "string.empty": "La fecha no puede estar vacía.",
            "string.pattern.base": "La fecha debe estar en formato DD-MM-YYYY.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos: idTeacher, idCourse, idSubject, horaInicio, horaTermino y fecha",
    });