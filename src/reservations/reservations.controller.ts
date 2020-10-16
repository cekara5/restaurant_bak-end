import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AddReservation } from './dto/add-reservation.dto';
import { ApiResponse } from 'src/api-response/api-response';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Get('find')
    findAllReservations(@Query('statusCode') statusCode: number): Promise<ApiResponse> {
        return this.reservationsService.findAllReservations(statusCode);
    }

    @Post('add')
    addReservation(
        @Body() addReservation: AddReservation
    ): Promise<ApiResponse> {
        return this.reservationsService.addReservation(addReservation);
    }

    @Get('confirm/:id')
    confirmReservation(@Param('id') id: number): Promise<ApiResponse> {
        return this.reservationsService.updateReservation(id, 1);
    }

    @Get('reject/:id')
    rejectReservation(@Param('id') id: number): Promise<ApiResponse> {
        return this.reservationsService.updateReservation(id, 2);
    }
}
