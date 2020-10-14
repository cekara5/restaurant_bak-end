import { Controller, Post, Body, Req } from '@nestjs/common';
import { Restourant } from './entities/restourant.entity';
import { AddRestourant } from './dto/add-restourant.dto';
import { RestourantService } from './restourant.service';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtSecret } from 'config/jwt.secret';
import { JwtDataDto } from 'src/middlewares/dto/jwt-data.dto';
import { ApiResponse } from 'src/api-response/api-response';
import { AddTablesDto } from './dto/add-tables.dto';

@Controller('restourant')
export class RestourantController {
    constructor(private readonly restourantService: RestourantService) { }

    @Post('add')
    addRestourant(
        @Body() addRestourant: AddRestourant,
        @Req() req: Request
    ): Promise<ApiResponse> {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.toString().split(' ')[1]; // Bearer 'token'
        const managerData = jwt.verify(token, JwtSecret) as JwtDataDto;
        const managerId = managerData.jwtData.id;
        return this.restourantService.addRestourant(addRestourant, managerId);
    }

    @Post('tables/add')
    addTables(
        @Body() addTablesDto: AddTablesDto
    ): Promise<ApiResponse> {
        return this.restourantService.addTables(addTablesDto);
    }
}
