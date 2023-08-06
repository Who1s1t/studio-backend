import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleEntity} from "./entities/schedule.entity";

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([ScheduleEntity])]
})
export class ScheduleModule {}
