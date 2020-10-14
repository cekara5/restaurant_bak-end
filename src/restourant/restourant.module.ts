import { Module } from '@nestjs/common';
import { RestourantController } from './restourant.controller';
import { RestourantService } from './restourant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restourant } from './entities/restourant.entity';
import { RestourantTables } from './entities/restourant-tables.entity';
import { RestourantWorkingHours } from './entities/restourant-working-hours.entity';
import { NonWorkingDays } from './entities/non-working-days.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Restourant,
    RestourantTables,
    RestourantWorkingHours,
    NonWorkingDays
  ])],
  controllers: [RestourantController],
  providers: [RestourantService]
})
export class RestourantModule { }
