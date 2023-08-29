import {IsDate, IsNotEmpty} from "class-validator";
import {CourseEntity} from "../../course/entities/course.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateScheduleDto {

    @IsNotEmpty()
    @ApiProperty()
    date: string

    @IsNotEmpty()
    @ApiProperty()
    time: string

    @IsNotEmpty()
    @ApiProperty()
    course: CourseEntity

}
