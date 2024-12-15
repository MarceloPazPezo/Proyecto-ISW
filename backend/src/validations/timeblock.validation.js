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
    diaSemana: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]{5,12}$/)
        .messages({
            "string.empty": "El dia de la semana no puede estar vacío.",
            "string.pattern.base": "El día de la semana debe contener entre 3 y 9 letras.",
        }),
})
    .or("idTeacher", "idCourse", "idSubject", "diaSemana")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos: idTeacher, idCourse, idSubject o dia de la semana",
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
    diaSemana: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]{5,12}$/)
        .messages({
            "string.empty": "El dia de la semana no puede estar vacío.",
            "string.pattern.base": "El día de la semana debe contener entre 3 y 9 letras.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos: idTeacher, idCourse, idSubject, horaInicio, horaTermino y diaSemana",
    });