import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ScheduleEntity} from "./entities/schedule.entity";

@Injectable()
export class ScheduleService {
  constructor(
      @InjectRepository(ScheduleEntity) private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
