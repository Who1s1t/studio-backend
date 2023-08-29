import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseEntity} from "../course/entities/course.entity";

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [TypeOrmModule.forFeature([CourseEntity])]
})
export class MailModule {}
