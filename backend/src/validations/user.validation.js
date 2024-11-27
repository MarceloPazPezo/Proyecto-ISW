"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
  const domainRegex = /@gmail\.(cl|com)$/;
  if (!domainRegex.test(value)) {
    return helper.message(
      "El correo electrónico debe finalizar en @gmail.cl o @gmail.com."
    );
  }
  return value;
};

export const userQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    }),
  email: Joi.string()
    .min(15)
    .max(35)
    .email()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo string.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl o @gmail.com.",
      "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  telefono: Joi.string()
    .min(9)
    .max(9)
    .pattern(/^\d{9}$/)
    .messages({
      "string.empty": "El teléfono no puede estar vacío.",
      "string.base": "El teléfono debe ser de tipo string.",
      "string.min": "El teléfono debe tener como mínimo 12 caracteres.",
      "string.max": "El teléfono debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato teléfono inválido, debe ser xxxxxxxxx.",
    }),
})
  .or("id", "email", "rut", "telefono")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: id, email o rut.",
  });

export const userBodyValidation = Joi.object({
  nombreCompleto: Joi.string()
    .min(15)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "string.base": "El nombre completo debe ser de tipo string.",
      "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
      "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
      "string.pattern.base":
        "El nombre completo solo puede contener letras y espacios.",
    }),
  email: Joi.string()
    .min(15)
    .max(35)
    .email()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo string.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl o @gmail.com.",
      "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "string.base": "La contraseña debe ser de tipo string.",
      "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La contraseña solo puede contener letras y números.",
    }),
  newPassword: Joi.string()
    .min(8)
    .max(26)
    .allow("")
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La nueva contraseña no puede estar vacía.",
      "string.base": "La nueva contraseña debe ser de tipo string.",
      "string.min": "La nueva contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La nueva contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La nueva contraseña solo puede contener letras y números.",
    }),
  rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  telefono: Joi.string()
    .min(9)
    .max(9)
    .pattern(/^\d{9}$/)
    .messages({
      "string.empty": "El teléfono no puede estar vacío.",
      "string.base": "El teléfono debe ser de tipo string.",
      "string.min": "El teléfono debe tener como mínimo 12 caracteres.",
      "string.max": "El teléfono debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato teléfono inválido, debe ser xxxxxxxxx.",
    }),
  rol: Joi.string()
    .min(4)
    .max(15)
    .messages({
      "string.base": "El rol debe ser de tipo string.",
      "string.min": "El rol debe tener como mínimo 4 caracteres.",
      "string.max": "El rol debe tener como máximo 15 caracteres.",
    }),
  estado: Joi.string()
    .valid("regular", "desvinculado").presence("required")
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "string.min": "El estado debe tener como mínimo 8 caracteres.",
      "string.max": "El estado debe tener como máximo 15 caracteres.",
    }),
})
  .or(
    "nombreCompleto",
    "email",
    "password",
    "newPassword",
    "rut",
    "telefono",
    "rol",
    "estado"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: nombreCompleto, email, password, newPassword, rut o rol.",
  });

export const addValidation = Joi.object({
  nombreCompleto: Joi.string()
    .min(15)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "any.required": "El nombre completo es obligatorio.",
      "string.base": "El nombre completo debe ser de tipo texto.",
      "string.min": "El nombre completo debe tener al menos 15 caracteres.",
      "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
      "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
    }),
  rut: Joi.string()
    .min(9)
    .max(12)
    .required()
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  email: Joi.string()
    .min(15)
    .max(35)
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl o @gmail.com.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  telefono: Joi.string()
    .min(9)
    .max(9)
    .pattern(/^\d{9}$/)
    .messages({
      "string.empty": "El teléfono no puede estar vacío.",
      "string.base": "El teléfono debe ser de tipo string.",
      "string.min": "El teléfono debe tener como mínimo 12 caracteres.",
      "string.max": "El teléfono debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato teléfono inválido, debe ser xxxxxxxxx.",
    }),
  rol: Joi.string()
    .min(4)
    .max(15)
    .messages({
      "string.base": "El rol debe ser de tipo string.",
      "string.min": "El rol debe tener como mínimo 4 caracteres.",
      "string.max": "El rol debe tener como máximo 15 caracteres.",
    }),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });