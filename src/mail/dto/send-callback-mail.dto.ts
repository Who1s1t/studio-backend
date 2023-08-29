import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SendCallbackMailDto {

    @IsNotEmpty()
    @ApiProperty()
    fullNameClient: string

    @IsNotEmpty()
    @ApiProperty()
    clientPhone: string
}
