"use strict";
import Joi from "joi";

export const reservationQueryValidation = Joi.object({
    id: Joi.number().integer().positive().messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
    }),
    horaInicio: Joi.string().messages({
        "string.pattern.base": "La hora de inicio debe estar en el formato HH:mm.",
    }),
    horaFin: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).messages({
        "string.pattern.base": "La hora de fin debe estar en el formato HH:mm.",
    }),
    fecha: Joi.date().messages({
        "date.base": "La fecha debe ser de tipo date.",
    }),
})
    .or("id", "horaInicio", "horaFin", "fecha")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: id, horaInicio, horaFin o fecha.",
    });

export const reservationBodyValidation = Joi.object({
    horaInicio: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).messages({
        "string.pattern.base": "La hora de inicio debe estar en el formato HH:mm:ss.",
    }),
    horaFin: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).messages({
        "string.pattern.base": "La hora de fin debe estar en el formato HH:mm:ss.",
    }),
    idTeacher: Joi.number().integer().positive().allow(null).messages({
        "number.base": "El idTeacher debe ser un número.",
        "number.integer": "El idTeacher debe ser un número entero.",
        "number.positive": "El idTeacher debe ser un número positivo.",
    }),
    idResource: Joi.number().integer().positive().messages({
        "number.base": "El idResource debe ser un número.",
        "number.integer": "El idResource debe ser un número entero.",
        "number.positive": "El idResource debe ser un número positivo.",
    }),
});