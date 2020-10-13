import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from 'config/database.config';
import { ManagerModule } from './manager/manager.module';
import { RestourantModule } from './restourant/restourant.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [],
      synchronize: false,
    }),
    ManagerModule,
    RestourantModule,
    ReservationsModule,
    UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
