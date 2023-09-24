import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CourseEntity} from "./entities/course.entity";
import {TeacherEntity} from "../teacher/entities/teacher.entity";

@Injectable()
export class CourseService {
  constructor(
      @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
      @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async create(createCourseDto: CreateCourseDto, file: Express.Multer.File) {
    if (!file) throw new BadRequestException("Изображение обязательно!");
    const teacher = await this.teacherRepository.findOne({
      where:{
        id: +createCourseDto.teacher
      }
    });
    if (!teacher) throw new NotFoundException("Преподаватель не найден!");
    const newCourse = {
      name: createCourseDto.name,
      price: createCourseDto.price,
      hours: createCourseDto.hours,
      teacher: createCourseDto.teacher,
      day: createCourseDto.day,
      // startDate: createCourseDto.startDate,
      // endDate: createCourseDto.endDate,
      open: String(createCourseDto['open']) == "true" ,
      shortDescription: createCourseDto.shortDescription,
      fullDescription: createCourseDto.fullDescription,
      image: file.filename,


    }
    return await this.courseRepository.save(newCourse)
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: {
        teacher: true
      }
    });
  }

  async findAllOpen() {
    return await this.courseRepository.find({
      where:{
        open: true
      },
      relations: {
        teacher: true
      }
    });
  }

  async findOne(id: number) {
    const course =  await this.courseRepository.findOne({
      where:{
        id
      },
      relations: {
        teacher: true
      }
    });
    if (!course) throw new NotFoundException("Курс не найден!")
    return course
  }

  async update(id: number, updateCourseDto:UpdateCourseDto,file) {
    const course = await this.courseRepository.findOne({
      where:{
        id
      }
    })
    if (!course) throw new NotFoundException("Курс не найден!");
    if (String(updateCourseDto['open']) != undefined){
      updateCourseDto['open'] = String(updateCourseDto['open']) == "true"
    }
    if (file) updateCourseDto["image"] = file.filename;
    return await this.courseRepository.update(id, updateCourseDto)
  }

  async remove(id: number){
    const course = await this.courseRepository.findOne({
      where:{
        id
      }
    })
    if (!course) throw new NotFoundException("Курс не найден!")
    return await this.courseRepository.delete(id)
  }
}
