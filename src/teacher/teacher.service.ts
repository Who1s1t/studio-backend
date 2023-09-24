import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TeacherEntity} from "./entities/teacher.entity";

@Injectable()
export class TeacherService {
  constructor(
      @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto, file) {

    if(!file)  throw new BadRequestException("Изображение обязательно!");
    const newTeacher = {
      firstname: createTeacherDto.firstname,
      surname: createTeacherDto.surname,
      lastname: createTeacherDto.lastname,
      description: createTeacherDto.description,
      image: file.filename
    }

    return await this.teacherRepository.save(newTeacher);
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where:{
        id
      }
    });
    if (!teacher) throw new NotFoundException("Преподаватель не найден!")

    return teacher

  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto, file) {
    const teacher = await this.teacherRepository.findOne({
      where:{
        id
      }
    });
    if (!teacher) throw new NotFoundException("Преподаватель не найден!");
    if (file) updateTeacherDto["image"] = file.filename;
    return  await this.teacherRepository.update(id, updateTeacherDto);
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where:{
        id
      }
    });
    if (!teacher) throw new NotFoundException("Преподаватель не найден!");
    return  await this.teacherRepository.delete(id);
  }
}
