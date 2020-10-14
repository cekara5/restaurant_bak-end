import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>
    ) { }

    async findByEmail(email: string): Promise<Manager> {
        return await this.managerRepository.findOne({
            where: { email: email }
        });
    }
    async insertManager(managerToInsert: Manager): Promise<Manager> {
        return await this.managerRepository.save(managerToInsert);
    }
}
