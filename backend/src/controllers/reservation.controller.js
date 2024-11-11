import {
    createReservationService,
    deleteReservationService,
    getReservationService,
    getReservationsService,
    updateReservationService
} from "../services/reservation.service.js";

import {
    reservationBodyValidation,
    reservationQueryValidation
} from "../validations/reservation.validation.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js"

export async function createReservation(req, res) {
    try {
        
        const reservationBody = req.body;

        console.log("Controller body:",reservationBody);

        const { error } = reservationBodyValidation.validate(reservationBody);

        // console.log("Controller error1:",error);

        if (error) return handleErrorClient(res, 404, error);

        const [reservation, errorReservation] = await createReservationService(reservationBody);

        // console.log("Controller error2:",errorReservation);

        // console.log("Controller reservation:1",reservation);

        if (errorReservation) return handleErrorClient(res, 404, errorReservation);

        handleSuccess(res, 201, "Reserva creada", reservation);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getReservations(req, res) {
    try {
        
        const [reservations, error] = await getReservationsService();

        if (error) return handleErrorClient(res, 404, error);

        reservations.length > 0 ? handleSuccess(res, 200, "Reservas encontradas", reservations)
        : handleErrorClient(res, 404, "No se encontraron reservas");

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getReservation(req, res) {
    try {
        
        const { id } = req.query;

        const { error } = reservationQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 404, error);

        const [reservation, errorReservation] = await getReservationService({ id });

        if (errorReservation) return handleErrorClient(res, 404, errorReservation);

        handleSuccess(res, 200, "Reserva encontrada", reservation);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateReservation(req, res) {
    try {
        
        const { id } = req.query;
        const { body } = req;

        const { error: queryError } = reservationQueryValidation({ id });

        if (queryError) return handleErrorClient(res,404,error);

        const { error: bodyError } = reservationBodyValidation({ body });

        if (bodyError) return handleErrorClient(res,404,error);

        const [reservation, errorReservation] = await updateReservationService({ id } , body);

        if (errorReservation) return handleErrorClient(res, 404, errorReservation);

        handleSuccess(res, 201, "Reserva actualizada", reservation);

    } catch (error) {
        handleErrorServer(res, 500, error.message);   
    }
}

export async function deleteReservation(req, res) {
    try {
        
        const { id } = req.query;

        const { error } = reservationQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 404, error);

        const [reservation, errorReservation] = await deleteReservationService({ id });

        if (errorReservation) return handleErrorClient(res, 404, errorReservation);

        handleSuccess(res, 200, "Reserva eliminada", reservation);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

