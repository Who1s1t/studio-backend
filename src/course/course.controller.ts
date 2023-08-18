import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, UseInterceptors,
} from '@nestjs/common';
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
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  create(@Body() createCourseDto: CreateCourseDto,@UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ }),
        ],
      }),
  )
      file: Express.Multer.File, )
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
}
