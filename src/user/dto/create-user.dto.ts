import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName:string

    @IsNotEmpty()
    lastName: string

    @IsEmail()
    email: string

    @MinLength(8, {message: "Пароль не может быть короче 8 символов!"})
    password: string

}