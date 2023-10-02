import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {TeacherEntity} from "../../teacher/entities/teacher.entity";
import {UserEntity} from "../../user/entities/user.entity";

export class CreateCourseDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @ApiProperty()
    price: number

    @IsNotEmpty()
    @ApiProperty()
    hours: number

    // @IsNotEmpty()
    // @ApiProperty()
    // startDate: Date

    @IsNotEmpty()
    @ApiProperty()
    open: boolean

    @IsNotEmpty()
    @ApiProperty()
    day: string

    // @IsNotEmpty()
    // @ApiProperty()
    // endDate: Date

    @IsNotEmpty()
    @ApiProperty()
    teacher: TeacherEntity


    @IsNotEmpty()
    @ApiProperty()
    shortDescription: string

    @IsNotEmpty()
    @ApiProperty()
    fullDescription: string

}
