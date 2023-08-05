import {IsDate, IsNotEmpty} from "class-validator";

export class CreateScheduleDto {

    @IsDate()
    date: Date

    @IsNotEmpty()
    course: number

}
