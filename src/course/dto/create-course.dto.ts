import {IsNotEmpty} from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    shortDescription: string

    @IsNotEmpty()
    fullDescription: string

}
