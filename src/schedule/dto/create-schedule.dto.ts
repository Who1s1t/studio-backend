import {IsDate, IsNotEmpty} from "class-validator";
import {CourseEntity} from "../../course/entities/course.entity";

export class CreateScheduleDto {

    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    course: CourseEntity

}
