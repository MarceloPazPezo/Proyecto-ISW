"use strict";
import Joi from "joi";

export const sourceQueryValidation = Joi.object({
    id : Joi.number().integer().positive().messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
    }),
    nombre : Joi.string().min(3).max(70).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        "string.pattern.base": "El nombre completo solo puede contener letras, espacios y números.",
    }),
    idManager : Joi.number().integer().positive().messages({
        "number.base": "El idManager debe ser un número.",
        "number.integer": "El idManager debe ser un número entero.",
        "number.positive": "El idManager debe ser un número positivo.",
    }),
    estado : Joi.string().valid("disponible", "ocupada" , "ocupado").messages({
        "string.base": "El estado debe ser de tipo string.",
        "string.min": "El estado debe tener como mínimo 8 caracteres.",
        "string.max": "El estado debe tener como máximo 15 caracteres.",
    }),
})
    .or("id", "nombre", "idManager")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: id, nombre o idManager.",
    });


export const sourceBodyValidation = Joi.object({
    nombre : Joi.string().min(3).max(70).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        "string.pattern.base": "El nombre completo solo puede contener letras, espacios y números.",
    }),
    idManager : Joi.number().integer().positive().messages({
        "number.base": "El idManager debe ser un número.",
        "number.integer": "El idManager debe ser un número entero.",
        "number.positive": "El idManager debe ser un número positivo.",
    }),
    // estado : Joi.string().valid("disponible", "ocupada" , "ocupado").messages({
    //     "string.base": "El estado debe ser de tipo string.",
    //     "string.min": "El estado debe tener como mínimo 8 caracteres.",
    //     "string.max": "El estado debe tener como máximo 15 caracteres.",
    // }),
})