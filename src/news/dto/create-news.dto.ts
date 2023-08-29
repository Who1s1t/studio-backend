import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateNewsDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @ApiProperty()
    shortDescription: string

    @IsNotEmpty()
    @ApiProperty()
    fullDescription: string

    @IsNotEmpty()
    @ApiProperty()
    author: string

}
