import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/api-response/api-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { AddReservation } from './dto/add-reservation.dto';
import { ReservationStatus } from 'src/utility/entities/reservation-status.entity';
import { response } from 'express';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(ReservationStatus)
        private readonly reservationStatusRepository: Repository<ReservationStatus>
    ) { }

    async findAllReservations(statusCode?: number): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        let options: any = {
            // select: ["name", "address", "name", "address", "name", "address",],
            relations: ['table', 'status']
        };
        if (statusCode !== undefined) {
            const reservationStatusWithCode = await this.reservationStatusRepository.findOne({ where: { code: statusCode } });
            if (!reservationStatusWithCode) {
                apiResponse.status = 'error';
                apiResponse.statusCode = -3201;
                apiResponse.message = "Status code is invalid!";
                return Promise.resolve(apiResponse);
            }
            options = { ...options, where: { statusId: reservationStatusWithCode.id } };
        }
        const reservations = await this.reservationRepository.find(options);

        apiResponse.data = reservations;
        return Promise.resolve(apiResponse);
    }

    async updateReservation(id: number, statusId: number): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        const reservationToUpdate = await this.reservationRepository.findOne(id);
        if (!reservationToUpdate) {
            apiResponse.status = 'error';
            apiResponse.statusCode = -3202;
            apiResponse.message = "Reservation with id:" + id + " doesn't exist!";
            return Promise.resolve(apiResponse);
        }
        reservationToUpdate.statusId = statusId;
        const updatedReservation = await this.reservationRepository.save(reservationToUpdate);
        apiResponse.data = updatedReservation;
        return Promise.resolve(apiResponse);
    }

    async addReservation(addReservation: AddReservation): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        try {
            const reservationToAdd = new Reservation();
            reservationToAdd.tableId = addReservation.tableId;
            reservationToAdd.name = addReservation.name;
            reservationToAdd.lastName = addReservation.lastName;
            reservationToAdd.phone = addReservation.phone;
            reservationToAdd.email = addReservation.email;
            reservationToAdd.fromTime = addReservation.fromTime;
            reservationToAdd.untillTime = addReservation.untillTime;
            reservationToAdd.reservationDate = addReservation.reservationDate;
            const defaultReservationStatus = await this.reservationStatusRepository.findOne({ where: { code: 0 } });
            reservationToAdd.statusId = defaultReservationStatus.id;
            const addedReservation = await this.reservationRepository.save(reservationToAdd);
            apiResponse.data = addedReservation;
        }
        catch (err) {
            apiResponse.status = 'error';
            apiResponse.statusCode = -3200;
            apiResponse.message = err.message;
        }
        finally {
            return Promise.resolve(apiResponse);
        }
    }
}
