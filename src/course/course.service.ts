import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CourseEntity} from "./entities/course.entity";

@Injectable()
export class CourseService {
  constructor(
      @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = {
      name: createCourseDto.name,
      price: createCourseDto.price,
      shortDescription: createCourseDto.shortDescription,
      fullDescription: createCourseDto.fullDescription,


    }
    return await this.courseRepository.save(newCourse)
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    return await this.courseRepository.findOne({
      where:{
        id
      }
    });
  }

  async update(id: number, updateCourseDto:UpdateCourseDto) {
    const course = await this.courseRepository.findOne({
      where:{
        id
      }
    })
    if (!course) throw new NotFoundException("Курс не найден!")
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
