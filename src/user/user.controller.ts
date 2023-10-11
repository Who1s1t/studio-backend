import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }



  // @Get(':email')
  // @UseGuards(JwtAuthGuard,AdminGuard)
  // findOne(@Param('email') email: string) {
  //   return this.userService.findOne(email);
  // }



}
