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
  UseInterceptors, UploadedFile, Res, HttpStatus
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";

@Controller('teacher')
@ApiTags('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post("create")
  @UsePipes(new ValidationPipe())
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        firstname: { type: 'string' },
        surname: { type: 'string' },
        lastname: { type: 'string' },
        description: { type: 'string' },
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
  create(@Body() createTeacherDto: CreateTeacherDto,@UploadedFile() file: Express.Multer.File) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
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
