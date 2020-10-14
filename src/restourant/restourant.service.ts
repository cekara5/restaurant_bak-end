import { Injectable } from '@nestjs/common';
import { AddRestourant } from './dto/add-restourant.dto';
import { Restourant } from './entities/restourant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/api-response/api-response';
import { AddTablesDto } from './dto/add-tables.dto';
import { RestourantTables } from './entities/restourant-tables.entity';
import { WorkingTime } from './dto/working-time.dto';
import { RestourantWorkingHours } from './entities/restourant-working-hours.entity';
import { AddWorkingTimesDto } from './dto/add-working-times.dto';
import { AddNonWorkingDaysDto } from './dto/add-non-working-days.dto';
import { NonWorkingDays } from './entities/non-working-days.entity';

@Injectable()
export class RestourantService {
    constructor(
        @InjectRepository(Restourant)
        private readonly restourantRepository: Repository<Restourant>,
        @InjectRepository(RestourantTables)
        private readonly restourantTablesRepository: Repository<RestourantTables>,
        @InjectRepository(RestourantWorkingHours)
        private readonly restourantWorkingHoursRepository: Repository<RestourantWorkingHours>,
        @InjectRepository(NonWorkingDays)
        private readonly restourantNonWorkingDaysRepository: Repository<NonWorkingDays>
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

    async addWorkingTime(addWorkingTimesDto: AddWorkingTimesDto): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        try {
            let workingHoursToAdd: RestourantWorkingHours[] = []; // workingHoursToAdd niz koji se ubacuje u bazu, pre toga ga je potrebno popuniti podacima
            addWorkingTimesDto.workingTimes.forEach(wt => { // punjenje niza workingHoursToAdd
                const newWorkingHour = new RestourantWorkingHours();
                newWorkingHour.restourantId = wt.restourantId;
                newWorkingHour.openingTime = wt.openingTime;
                newWorkingHour.closingTime = wt.closingTime;
                newWorkingHour.dayOfWeekId = wt.dayOfWeekId;
                if (wt.isWorking !== undefined) {
                    newWorkingHour.isWorking = wt.isWorking;
                }
                workingHoursToAdd = [...workingHoursToAdd, newWorkingHour];
            });
            const addedWorkingHours = await this.restourantWorkingHoursRepository.save(workingHoursToAdd);
            apiResponse.data = addedWorkingHours; // success
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

    async addNonWorkingDays(addNonWorkingDaysDto: AddNonWorkingDaysDto): Promise<ApiResponse> {
        const apiResponse = new ApiResponse();
        try {
            let nonWorkingDaysToAdd: NonWorkingDays[] = []; // workingHoursToAdd niz koji se ubacuje u bazu, pre toga ga je potrebno popuniti podacima
            addNonWorkingDaysDto.nonWorkingDays.forEach(nwd => { // punjenje niza workingHoursToAdd
                const newNonWorkingDay = new NonWorkingDays();
                newNonWorkingDay.restaurantId = nwd.restourantId;
                newNonWorkingDay.descriptionId = nwd.descriptionId;
                newNonWorkingDay.date = nwd.date;
                nonWorkingDaysToAdd = [...nonWorkingDaysToAdd, newNonWorkingDay];
            });
            const addedNonWorkingDays = await this.restourantNonWorkingDaysRepository.save(nonWorkingDaysToAdd);
            apiResponse.data = addedNonWorkingDays; // success
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
