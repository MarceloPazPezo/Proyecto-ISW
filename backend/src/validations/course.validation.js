"use strict";
import Joi from "joi";

export const courseQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
    nombre: Joi.string()
    .min(3)
    .max(15)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 15 caracteres.",
      "string.pattern.base":
      "El nombre solo puede contener letras y espacios.",
    }),
    idBossTeacher: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idBossTeacher debe ser un número.",
      "number.integer": "El idBossTeacher debe ser un número entero.",
      "number.positive": "El idBossTeacher debe ser un número positivo.",
    }),
    idClassroom: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idClassroom debe ser un número.",
      "number.integer": "El idClassroom debe ser un número entero.",
      "number.positive": "El idClassroom debe ser un número positivo.",
    }),
})
  .or("id","nombre","idBossTeacher","idClassroom")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
    "Debes proporcionar al menos un parámetro: id, nombre, idBossTeacher, idClassroom  ",
  });

export const courseBodyValidation = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(15)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 15 caracteres.",
      "string.pattern.base":
        "El nombre solo puede contener letras y espacios.",
    }),
    idBossTeacher: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idBossTeacher debe ser un número.",
      "number.integer": "El idBossTeacher debe ser un número entero.",
      "number.positive": "El idBossTeacher debe ser un número positivo.",
    }),
    idClassroom: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idClassroom debe ser un número.",
      "number.integer": "El idClassroom debe ser un número entero.",
      "number.positive": "El idClassroom debe ser un número positivo.",
    }),
    cantidadAlumnos: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El cantidadAlumnos debe ser un número.",
      "number.integer": "El cantidadAlumnos debe ser un número entero.",
      "number.positive": "El cantidadAlumnos debe ser un número positivo.",
    }),
    
})
  .or(
    "nombre",
    "idBossTeacher",
    "idClassroom",
    "cantidadAlumnos"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
    "Debes proporcionar al menos un campo: nombre, idBossTeacher, idClassroom,cantidadAlumnos",
  });
export const addValidation = Joi.object({
   nombre: Joi.string()
   .min(3)
   .max(15)
   .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
   .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 15 caracteres.",
      "string.pattern.base":
      "El nombre solo puede contener letras y espacios.",
      }),
  idBossTeacher: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El idBossTeacher debe ser un número.",
      "number.integer": "El idBossTeacher debe ser un número entero.",
      "number.positive": "El idBossTeacher debe ser un número positivo.",
     }),
  idClassroom: Joi.number()
  .integer()
  .positive()
  .messages({
    "number.base": "El idClassroom debe ser un número.",
    "number.integer": "El idClassroom debe ser un número entero.",
    "number.positive": "El idClassroom debe ser un número positivo.",
  }),
  cantidadAlumnos: Joi.number()
  .integer()
  .positive()
  .messages({
    "number.base": "El cantidadAlumnos debe ser un número.",
    "number.integer": "El cantidadAlumnos debe ser un número entero.",
    "number.positive": "El cantidadAlumnos debe ser un número positivo.",
  }), 
})
  .unknown(false)
  .messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});