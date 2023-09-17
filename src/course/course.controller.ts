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
  Res,
} from '@nestjs/common';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        name: { type: 'string' },
        price: { type: 'integer' },
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
          destination: './uploads/img',
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
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch("update/:id")
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete("delete/:id")
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Get('img/:imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads/img' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
