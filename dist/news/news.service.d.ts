/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';
export declare class NewsService {
    private newsRepository;
    constructor(newsRepository: Repository<NewsEntity>);
    create(createNewsDto: CreateNewsDto, file: Express.Multer.File): Promise<{
        title: string;
        shortDescription: string;
        fullDescription: string;
        image: string;
    } & NewsEntity>;
    findAll(): Promise<NewsEntity[]>;
    findOne(id: number): Promise<NewsEntity>;
    update(id: number, updateNewsDto: UpdateNewsDto, file: Express.Multer.File): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
