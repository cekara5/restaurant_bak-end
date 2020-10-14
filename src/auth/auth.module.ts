import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [ManagerModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
