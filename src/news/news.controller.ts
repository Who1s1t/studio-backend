import {
  Body,
  Controller, Delete,
  Get, Param, Patch,
  Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Post("create")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createNewsDto: CreateNewsDto){
    return this.newsService.create(createNewsDto)
  }
  @Get()
  findAll() {
    return this.newsService.findAll();
  }
  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
  @Patch("update/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  update(
      @Param('id') id: string,
      @Body() updateNewsDto:UpdateNewsDto, ) {
    return this.newsService.update(+id, updateNewsDto);
  }
  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  remove(
      @Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}