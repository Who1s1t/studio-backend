import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {IUSer} from "../types/types";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        const passwordIsMatch = await argon2.verify(user.password, password);
        if (user && passwordIsMatch) {
            return user;
        }

        throw new UnauthorizedException("Неверный Email или пароль!")
    }

    async login(user: IUSer) {
        const payload = {id: user.id, email: user.email,firstName: user.firstName, lastName: user.lastName, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
