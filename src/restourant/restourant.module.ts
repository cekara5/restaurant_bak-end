import { Module } from '@nestjs/common';
import { RestourantController } from './restourant.controller';
import { RestourantService } from './restourant.service';

@Module({
  controllers: [RestourantController],
  providers: [RestourantService]
})
export class RestourantModule {}
