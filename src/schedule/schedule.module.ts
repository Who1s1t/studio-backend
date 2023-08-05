import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "../news/entities/news.entity";

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([NewsEntity])]
})
export class ScheduleModule {}
