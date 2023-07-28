import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      private readonly jwtService:JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    })
    if(existUser) throw new BadRequestException('Пользователь с таким Email уже существует!')
    const user = await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      role: 'student',
    })
    const token = this.jwtService.sign({id: user.id, email: user.email,firstName: user.firstName, lastName: user.lastName, role: user.role})
    return {user, token}

  }


  async findOne(email: string) {
    return await this.userRepository.findOne({
      where:{
        email
      }
    })
  }


}
