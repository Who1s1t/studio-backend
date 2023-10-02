import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CourseEntity} from "./entities/course.entity";
import {TeacherEntity} from "../teacher/entities/teacher.entity";
import {UserEntity} from "../user/entities/user.entity";

@Injectable()
export class CourseService {
  constructor(
      @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
      @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>,
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
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
        users: true,
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
        users: true,
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
        users: true,
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

  async addUser(id: number, user_id: number){
    const course = await this.courseRepository.findOne({
      where:{
        id
      },
      relations: {
        users: true,
        teacher: true
      }
    });
    if (!course) throw new NotFoundException("Курс не найден!");

    const user = await this.userRepository.findOne({
      where:{
        id: user_id
      },

    });
    if (!user) throw new NotFoundException("Студент не найден!");

   course.users.push(user)
    return await this.courseRepository.save(course)
  }

  async deleteUser(id: number, user_id: number){
    const course = await this.courseRepository.findOne({
      where:{
        id
      },
      relations: {
        users: true,
        teacher: true
      }
    });
    if (!course) throw new NotFoundException("Курс не найден!");

    const user = await this.userRepository.findOne({
      where:{
        id: user_id
      },

    });
    if (!user) throw new NotFoundException("Студент не найден!");


    course.users = course.users.filter((user) => user.id !== user_id)
    return await this.courseRepository.save(course)
  }

  async deleteAllUser(id: number){
    const course = await this.courseRepository.findOne({
      where:{
        id
      },
      relations: {
        users: true,
        teacher: true
      }
    });
    if (!course) throw new NotFoundException("Курс не найден!");

    course.users = []
    return await this.courseRepository.save(course)
  }
}
