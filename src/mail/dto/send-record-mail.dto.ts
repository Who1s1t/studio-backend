import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";



export class SendRecordMailDto {

    @IsNotEmpty()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @ApiProperty()
    fullNameStudent: string

    @IsNotEmpty()
    @ApiProperty()
    studentPhone: string

    @IsNotEmpty()
    @ApiProperty()
    fullNameParent: string

    @IsNotEmpty()
    @ApiProperty()
    parentPhone: string
}
