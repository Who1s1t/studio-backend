import {IsNotEmpty} from "@nestjs/class-validator";


export class CreateNewsDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    shortDescription: string
    @IsNotEmpty()
    fullDescription: string
    @IsNotEmpty()
    author: string
}
