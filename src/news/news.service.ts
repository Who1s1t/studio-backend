import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
      @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
  ) {}
  async create(createNewsDto: CreateNewsDto){
    const newNews = {
      title: createNewsDto.title,
      shortDescription: createNewsDto.shortDescription,
      fullDescription: createNewsDto.fullDescription,
      author: createNewsDto.author,

    }
    return await this.newsRepository.save(newNews)
  };
  async findAll() {
    return await this.newsRepository.find();
  }
  async findOne(id: number) {
    return await this.newsRepository.findOne({
      where:{
        id
      }
    });
  }
  async update(id: number, updateNewsDto:UpdateNewsDto) {
    const news = await this.newsRepository.findOne({
      where:{
        id
      }
    })
    if (!news) throw new NotFoundException("News not found!")
    return await this.newsRepository.update(id, updateNewsDto)
  }
  async remove(id: number){
    const news = await this.newsRepository.findOne({
      where:{
        id
      }
    })
    if (!news) throw new NotFoundException("News not found!")
    return await this.newsRepository.delete(id)
  }
}