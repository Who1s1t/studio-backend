import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import {SendMailDto} from "./dto/send-mail.dto";
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  send(@Body() sendMailDto: SendMailDto) {
    return this.mailService.send(sendMailDto);
  }


}
