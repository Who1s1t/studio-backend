import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";

@Controller('schedule')
@ApiTags('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }


  @Get(':date')
  findByDate(@Param('date')date: string) {
    return this.scheduleService.findByDate(date);
  }

  @Patch("update/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
