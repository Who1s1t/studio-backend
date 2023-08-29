import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { SendRecordMailDto } from './dto/send-record-mail.dto';
import {MailerService} from "@nestjs-modules/mailer";
import {InjectRepository} from "@nestjs/typeorm";
import {CourseEntity} from "../course/entities/course.entity";
import {Repository} from "typeorm";
import {SendCallbackMailDto} from "./dto/send-callback-mail.dto";

@Injectable()
export class MailService {
  constructor(
      private readonly mailerService: MailerService,
      @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
  ) {}

  async sendRecord (sendRecordMailDto: SendRecordMailDto) {

      const course = await this.courseRepository.findOne({
            select:['name'],
          where:{
              id : sendRecordMailDto.id
          }
      })
      if (!course) throw new NotFoundException("Курс не найден!")

      return  await this.mailerService
            .sendMail({
              to: "dedsek965@gmail.com",
              subject: 'Уведомление: Запись на курс',
              template: 'record',
              context: {
                  name: course.name,
                  fullNameStudent: sendRecordMailDto.fullNameStudent,
                  studentPhone: sendRecordMailDto.studentPhone,
                  fullNameParent: sendRecordMailDto.fullNameParent,
                  parentPhone: sendRecordMailDto.parentPhone,

              },
            })
            .catch((e) => {

              throw new HttpException(
                  `Ошибка работы почты: ${JSON.stringify(e)}`,
                  HttpStatus.UNPROCESSABLE_ENTITY,
              );
            });
  }

    async sendCallback (sendCallbackMailDto: SendCallbackMailDto) {

        return  await this.mailerService
            .sendMail({
                to: "dedsek965@gmail.com",
                subject: 'Уведомление: Запись на консультацию',
                template: 'callback',
                context: {
                    fullNameClient: sendCallbackMailDto.fullNameClient,
                    clientPhone: sendCallbackMailDto.clientPhone,
                },
            })
            .catch((e) => {

                throw new HttpException(
                    `Ошибка работы почты: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            });
    }



}
