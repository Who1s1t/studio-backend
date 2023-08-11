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

  async create(createScheduleDto: CreateScheduleDto) {
    const newSchedule = {
      time: createScheduleDto.time,
      date: createScheduleDto.date,
      course: createScheduleDto.course,
    }
    return await this.scheduleRepository.save(newSchedule)
  };

  async findByDate(date: string ) {
    return await this.scheduleRepository.find({
      where:{
        date
      },
      relations: {
        course: true,
      },
    });
  }


  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
