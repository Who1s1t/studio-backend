import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  send(sendMailDto: SendMailDto) {
    return 'This action adds a new mail';
  }


}
