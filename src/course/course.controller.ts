import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  UseInterceptors,
  HttpStatus,
  Res, UseGuards,
} from '@nestjs/common';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {AdminGuard} from "../guard/admin.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        name: { type: 'string' },
        price: { type: 'integer' },
        hours: {type: "integer"},
        open: {type: "boolean"},
        day: {type: "string"},
        teacher: {type: "integer"},
        fullDescription: { type: 'string' },
        shortDescription: { type: 'string' },
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
          destination: './uploads/img/course',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
  )
  @ApiConsumes('multipart/form-data')
  create(@Body() createCourseDto: CreateCourseDto,@UploadedFile() file: Express.Multer.File, )
    {

    return this.courseService.create(createCourseDto, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard,AdminGuard)
  findAll() {
    return this.courseService.findAll();
  }

  @Get('open')
  findAllOpen() {
    return this.courseService.findAllOpen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }


  @Get(':id/adduser/:user_id')
  @UseGuards(JwtAuthGuard,AdminGuard)
  addUser(@Param('id') id: string,@Param('user_id') user_id: string) {
    return this.courseService.addUser(+id, +user_id);
  }

  @Delete(':id/deleteuser/:user_id')
  @UseGuards(JwtAuthGuard,AdminGuard)
  deleteUser(@Param('id') id: string,@Param('user_id') user_id: string) {
    return this.courseService.deleteUser(+id, +user_id);
  }
  @Delete(':id/deletealluser/')
  @UseGuards(JwtAuthGuard,AdminGuard)
  deleteAllUser(@Param('id') id: string,) {
    return this.courseService.deleteAllUser(+id);
  }

  @Patch("update/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        name: { type: 'string' },
        price: { type: 'integer' },
        hours: {type: "integer"},
        open: {type: "boolean"},
        day: {type: "string"},
        teacher: {type: "integer"},
        fullDescription: { type: 'string' },
        shortDescription: { type: 'string' },
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
          destination: './uploads/img/course',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
  )
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @UploadedFile() file: Express.Multer.File) {
    return this.courseService.update(+id, updateCourseDto, file);
  }

  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard,AdminGuard)
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Get('img/:imagename')
  getImage(@Param('imagename') image: string, @Res() res) {
    const response = res.sendFile(image, { root: './uploads/img/course' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
