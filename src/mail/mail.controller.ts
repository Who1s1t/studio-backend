import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { MailService } from './mail.service';
import {SendRecordMailDto} from "./dto/send-record-mail.dto";
import {ApiTags} from "@nestjs/swagger";
import {SendCallbackMailDto} from "./dto/send-callback-mail.dto";
@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('record')
  @UsePipes(new ValidationPipe())
  sendRecord(@Body() sendRecordMailDto: SendRecordMailDto) {
    return this.mailService.sendRecord(sendRecordMailDto);
  }

  @Post('callback')
  @UsePipes(new ValidationPipe())
  sendCallback(@Body() sendCallbackMailDto: SendCallbackMailDto) {
    return this.mailService.sendCallback(sendCallbackMailDto);
  }


}
