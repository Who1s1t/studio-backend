import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseEntity} from "./entities/course.entity";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [TypeOrmModule.forFeature([CourseEntity])]
})
export class CourseModule {}
