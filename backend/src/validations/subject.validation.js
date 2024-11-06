"use strict";
import Joi from "joi";

export const subjectQueryValidation = Joi.object({
    id: Joi.number().integer().positive().messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
    }),
    nombre: Joi.string().min(3).max(25).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 25 caracteres.",
    }),
    departamento: Joi.string().min(3).max(25).messages({
        "string.empty": "El departamento no puede estar vacío.",
        "string.base": "El departamento debe ser de tipo string.",
        "string.min": "El departamento debe tener como mínimo 3 caracteres.",
        "string.max": "El departamento debe tener como máximo 25 caracteres.",
    }),
})
    .or("id", "nombre", "departamento")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: id, nombre o departamento.",
    });

export const subjectBodyValidation = Joi.object({
    nombre: Joi.string().min(3).max(25).pattern(/^[a-zA-Z\s]+$/).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 25 caracteres.",
        "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
    departamento: Joi.string().min(3).max(25).pattern(/^[a-zA-Z\s]+$/).messages({
        "string.empty": "El departamento no puede estar vacío.",
        "string.base": "El departamento debe ser de tipo string.",
        "string.min": "El departamento debe tener como mínimo 3 caracteres.",
        "string.max": "El departamento debe tener como máximo 25 caracteres.",
        "string.pattern.base": "El departamento solo puede contener letras y espacios.",
    }),
});
