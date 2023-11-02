import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    firstName:string

    @IsNotEmpty()
    @ApiProperty()
    lastName: string

    @IsNotEmpty()
    @ApiProperty()
    birthday: Date

    @IsNotEmpty()
    @ApiProperty()
    phoneNumber: string

    @IsEmail()
    @ApiProperty()
    email: string

    @MinLength(8, {message: "Пароль не может быть короче 8 символов!"})
    @ApiProperty()
    password: string

}