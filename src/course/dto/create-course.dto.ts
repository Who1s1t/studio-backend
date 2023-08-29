import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCourseDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @ApiProperty()
    price: number

    @IsNotEmpty()
    @ApiProperty()
    shortDescription: string

    @IsNotEmpty()
    @ApiProperty()
    fullDescription: string

}
