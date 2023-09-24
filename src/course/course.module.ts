import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseEntity} from "./entities/course.entity";
import {TeacherEntity} from "../teacher/entities/teacher.entity";

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [TypeOrmModule.forFeature([CourseEntity, TeacherEntity])]
})
export class CourseModule {}
