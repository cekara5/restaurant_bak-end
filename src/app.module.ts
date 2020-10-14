import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from 'config/database.config';
import { ManagerModule } from './manager/manager.module';
import { RestourantModule } from './restourant/restourant.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UtilityModule } from './utility/utility.module';
import { AuthModule } from './auth/auth.module';
import { Manager } from './manager/entities/manager.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { NonWorkingDays } from './restourant/entities/non-working-days.entity';
import { RestourantTables } from './restourant/entities/restourant-tables.entity';
import { RestourantWorkingHours } from './restourant/entities/restourant-working-hours.entity';
import { Restourant } from './restourant/entities/restourant.entity';
import { City } from './utility/entities/city.entity';
import { DayOfWeek } from './utility/entities/day-of-week.entity';
import { NonWorkingDaysDesc } from './utility/entities/non-working-days-desc.entity';
import { ReservationStatus } from './utility/entities/reservation-status.entity';
import { TableDesc } from './utility/entities/table-desc.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [
        Manager,
        Reservation,
        NonWorkingDays,
        RestourantTables,
        RestourantWorkingHours,
        Restourant,
        City,
        DayOfWeek,
        NonWorkingDaysDesc,
        ReservationStatus,
        TableDesc
      ],
      synchronize: false,
    }),
    ManagerModule,
    RestourantModule,
    ReservationsModule,
    UtilityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
