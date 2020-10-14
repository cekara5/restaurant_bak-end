import { Module } from '@nestjs/common';
import { RestourantController } from './restourant.controller';
import { RestourantService } from './restourant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restourant } from './entities/restourant.entity';
import { RestourantTables } from './entities/restourant-tables.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restourant, RestourantTables])],
  controllers: [RestourantController],
  providers: [RestourantService]
})
export class RestourantModule { }
