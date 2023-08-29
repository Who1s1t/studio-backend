import {IsNotEmpty} from "class-validator";



export class SendCallbackMailDto {

    @IsNotEmpty()
    fullNameClient: string
    @IsNotEmpty()
    clientPhone: string
}
