"use strict";
// import Reservation from "../entity/reservation.entity.js";
// import Resource from "../entity/resource.entity.js";
import { AppDataSource } from "../config/configDb.js";
import  Reservation from "../entity/reservation.entity.js";
import  Usuario from "../entity/user.entity.js";
import  Resource from "../entity/resource.entity.js";
import { format, parse } from "date-fns"; // npm install date-fns

export async function getReservationbyIDService(query) {
    try {
        const { id } = query;

        console.log("IDSERVBACK:", id);

        const reservationRepository = AppDataSource.getRepository(Reservation);

        // Buscar la reserva cuyo idResource coincida con el id proporcionado
        const reservationFound = await reservationRepository.findOne({
            where: {
                idResource: id,
            },
        });

        // Si no se encuentra la reserva, retornar un mensaje apropiado
        if (!reservationFound) return [null, "No se encontró la reserva solicitada."];

        return [reservationFound, null];
    } catch (error) {
        console.error("Error al obtener la reserva: ", error);
        return [null, "Error interno del servidor."];
    }
}


export async function getReservationService(query) {
    try {

        const { id } = query;

        console.log("IDSERVBACK:", id);
        
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationFound = await reservationRepository.findOne({
            where: [{ idTeacher: id }],
            relations: ["resource","teacher"],
        });

        if (!reservationFound) return [null, "No se encontró la reserva solicitada."]

        return [reservationFound, null];
    } catch (error) {
        console.error("Error al obtener la reserva: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function getReservationsService() {
    try {

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationsFound = await reservationRepository.find({
            relations: ["resource","teacher"], // Para devolver todos los datos de la relación
        })

        console.log("Reservas encontradas:", reservationsFound);

        if (!reservationsFound) return [null, "No se encontraron reservas."];

        return [reservationsFound, null];
    } catch (error) {
        console.error("Error al obtener las reservas: ", error);
        return [null, "Error interno del servidor."];
    }
}

export async function createReservationService(dataReservation) {
    try {
        const reservationRepository = AppDataSource.getRepository(Reservation);
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const resourceRepository = AppDataSource.getRepository(Resource);

        const { horaInicio, horaFin, fecha, idUsuario, idResource } = dataReservation;

        console.log("Data: ", horaInicio, horaFin, fecha, idUsuario, idResource);

        // Verificar que idResource no sea nulo o indefinido
        if (!idResource) {
            throw new Error("El idResource es requerido");
        }

        const resource = await resourceRepository.findOneBy({ id: idResource });

        if (!resource) {
            throw new Error("Resource not found");
        }

        let usuario = null;
        if (idUsuario) {
            usuario = await usuarioRepository.findOneBy({ id: idUsuario });
            if (!usuario) {
                throw new Error("Usuario not found");
            }
        }

        // Formatear la fecha a DD-MM-YYYY y luego parsearla de nuevo a un objeto Date
        const formattedDate = format(new Date(fecha), "dd-MM-yyyy");
        const dateObject = parse(formattedDate, "dd-MM-yyyy", new Date());

        const newReservation = reservationRepository.create({
            horaInicio,
            horaFin,
            fecha: dateObject,
            resource,
            teacher : null,
        });

        // Verificar el tipo de dato de la fecha
        // console.log("Nueva reserva:", newReservation);
        // console.log("Tipo de dato de fecha:", typeof newReservation.fecha);
        // console.log("¿Es instancia de Date?:", newReservation.fecha instanceof Date);

        const response = await reservationRepository.save(newReservation);

        // console.log("Respuesta de la base de datos:", response);

        // console.log("ErrorService:", error);

        return [ newReservation , null];
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
}

export async function updateReservationService(query, body) {
    try {
        console.log("Body:", body);

        const reservationRepository = AppDataSource.getRepository(Reservation);

        // Extrae el ID directamente del body
        const { id } = body;

        // Busca la reserva existente
        const reservationFound = await reservationRepository.findOne({
            where: { id: id },
        });

        if (!reservationFound) return [null, "Reserva no encontrada"];

        // Construye el objeto de actualización dinámicamente
        const reservationData = {
            horaInicio: body.horaInicio || reservationFound.horaInicio,
            horaFin: body.horaFin || reservationFound.horaFin,
            fecha: body.fecha || reservationFound.fecha,
            idTeacher: body.idTeacher ?? reservationFound.idTeacher, // Si viene vacío, conserva el valor original
            idResource: body.idResource || reservationFound.idResource,
            updatedAt: new Date(),
        };

        // Realiza la actualización
        await reservationRepository.update({ id: id }, reservationData);

        // Recupera la reserva actualizada (opcional, si necesitas devolverla)
        const reservationUpdated = await reservationRepository.findOne({ where: { id: id } });

        return [reservationUpdated, null];
    } catch (error) {
        console.error("Error al actualizar la reserva: ", error);
        return [null, "Error interno del servidor."];
    }
}


export async function deleteReservationService(query) {
    try {

        const { id } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationFound = await reservationRepository.findOne({
            where: { id },
        });

        if (!reservationFound) return [null, "Reserva no encontrada"];

        const reservationRemoved = await reservationRepository.remove({ id });

        return [reservationRemoved, null];
    } catch (error) {
        console.error("Error al eliminar la reserva: ", error);
        return [null, "Error interno del servidor."];
    }
}