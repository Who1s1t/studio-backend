import {
  Body,
  Controller, Delete,
  Get, HttpStatus, Param, Patch,
  Post, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiTags} from '@nestjs/swagger';

import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../guard/admin.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Post("create")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        title: { type: 'string' },
        shortDescription: { type: 'string' },
        fullDescription: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/img/news',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
  )
  @ApiConsumes('multipart/form-data')
  create(@Body() createNewsDto: CreateNewsDto,@UploadedFile() file: Express.Multer.File, ){
    return this.newsService.create(createNewsDto, file)
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
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        title: { type: 'string' },
        shortDescription: { type: 'string' },
        fullDescription: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/img/news',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
  )
  @ApiConsumes('multipart/form-data')
  update(
      @Param('id') id: string,
      @Body() updateNewsDto:UpdateNewsDto,
      @UploadedFile() file: Express.Multer.File, ) {
    return this.newsService.update(+id, updateNewsDto, file);
  }
  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  remove(
      @Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  @Get('img/:imagename')
  getImage(@Param('imagename') image: string, @Res() res) {
    const response = res.sendFile(image, { root: './uploads/img/news' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}