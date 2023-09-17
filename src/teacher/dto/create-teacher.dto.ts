import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CourseEntity} from "../../course/entities/course.entity";

export class CreateTeacherDto {

    @IsNotEmpty()
    @ApiProperty()
    firstname: string

    @IsNotEmpty()
    @ApiProperty()
    surname: string

    @IsNotEmpty()
    @ApiProperty()
    lastname: string

    @IsNotEmpty()
    @ApiProperty()
    description: string




}
