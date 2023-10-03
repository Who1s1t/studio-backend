import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { MailService } from './mail.service';
import {SendRecordMailDto} from "./dto/send-record-mail.dto";
import {ApiTags} from "@nestjs/swagger";
import {SendCallbackMailDto} from "./dto/send-callback-mail.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";
@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('record')
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  sendRecord(@Body() sendRecordMailDto: SendRecordMailDto) {
    return this.mailService.sendRecord(sendRecordMailDto);
  }

  @Post('callback')
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  sendCallback(@Body() sendCallbackMailDto: SendCallbackMailDto) {
    return this.mailService.sendCallback(sendCallbackMailDto);
  }


}
