import { Injectable } from '@nestjs/common';
import { AddRestourant } from './dto/add-restourant.dto';
import { Restourant } from './entities/restourant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/api-response/api-response';
import { AddTablesDto } from './dto/add-tables.dto';
import { RestourantTables } from './entities/restourant-tables.entity';

@Injectable()
export class RestourantService {
    constructor(
        @InjectRepository(Restourant)
        private readonly restourantRepository: Repository<Restourant>,
        @InjectRepository(RestourantTables)
        private readonly restourantTablesRepository: Repository<RestourantTables>
    ) { }

    async addRestourant(addRestourant: AddRestourant, managerId: number): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        try {
            const restourantToAdd = new Restourant();
            restourantToAdd.managerId = managerId;
            restourantToAdd.name = addRestourant.name;
            restourantToAdd.address = addRestourant.address;
            restourantToAdd.description = addRestourant.description;
            restourantToAdd.cityId = addRestourant.cityId;

            const nameTaken = await this.restourantRepository.findOne({ where: { name: addRestourant.name } });
            if (nameTaken) {
                apiResponse.status = 'error';
                apiResponse.statusCode = -3101;
                apiResponse.message = 'Restourant name isa already taken!';
            }
            else {
                const addedRestourant = await this.restourantRepository.save(restourantToAdd);
                apiResponse.data = addedRestourant; // success
            }
        }
        catch (err) {
            apiResponse.status = 'error';
            apiResponse.statusCode = -3100;
            apiResponse.message = err.message;
        }
        finally {
            return Promise.resolve(apiResponse);
        }
    }

    async addTables(addTablesDto: AddTablesDto): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        try {
            let tablesToAdd: RestourantTables[] = []; // tablesToAdd niz koji se ubacuje u bazu, pre toga ga je potrebno popuniti podacima
            addTablesDto.tables.forEach(table => { // punjenje niza tablesToAdd
                const newTable = new RestourantTables();
                newTable.restourantId = table.restourantId;
                newTable.tableNumber = table.number;
                newTable.capacity = table.capacity;
                newTable.descriptionId = table.descriptionId;
                newTable.maxHoursAvailable = table.maxHoursAvailable;
                tablesToAdd = [...tablesToAdd, newTable];
            });
            const addedTables = await this.restourantTablesRepository.save(tablesToAdd);
            apiResponse.data = addedTables; // success
        }
        catch (err) {
            apiResponse.status = 'error';
            apiResponse.statusCode = -3100;
            apiResponse.message = err.message;
        }
        finally {
            return Promise.resolve(apiResponse);
        }
    }
}
