import {IsNotEmpty} from "class-validator";



export class SendRecordMailDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    fullNameStudent: string
    @IsNotEmpty()
    studentPhone: string
    @IsNotEmpty()
    fullNameParent: string
    @IsNotEmpty()
    parentPhone: string
}
