import {
  Body,
  Controller, Delete,
  Get, Param, Patch,
  Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Post("create")
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
  @UsePipes(new ValidationPipe())
  update(
      @Param('id') id: string,
      @Body() updateNewsDto:UpdateNewsDto, ) {
    return this.newsService.update(+id, updateNewsDto);
  }
  @Delete("delete/:id")
  remove(
      @Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}