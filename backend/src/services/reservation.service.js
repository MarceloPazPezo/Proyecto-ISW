"use strict";
// import Reservation from "../entity/reservation.entity.js";
// import Resource from "../entity/resource.entity.js";
import { AppDataSource } from "../config/configDb.js";
import  Reservation from "../entity/reservation.entity.js";
import  Usuario from "../entity/user.entity.js";
import  Resource from "../entity/resource.entity.js";
import { format, parse } from "date-fns"; // npm install date-fns

export async function getReservationService(query) {
    try {

        const { id } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationFound = await reservationRepository.findOne({
            where: [{ id }],
            relations: ["manager"],
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

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const { id } = query;

        const reservationFound = await reservationRepository.findOne({
            where: { id },
        });

        if (!reservationFound) return [null, "Reserva no encontrada"];

        const reservationData = {
            horaInicio : body.horaInicio,
            horaFin : body.horaFin,
            fecha : body.fecha,
            idTeacher : body.idTeacher,
            idResource : body.idResource,
            updatedAt : new Date()
        }

        const reservationUpdated = await reservationRepository.save(reservationData);

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