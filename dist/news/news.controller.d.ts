/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto, file: Express.Multer.File): Promise<{
        title: string;
        shortDescription: string;
        fullDescription: string;
        image: string;
    } & import("./entities/news.entity").NewsEntity>;
    findAll(): Promise<import("./entities/news.entity").NewsEntity[]>;
    findOne(id: string): Promise<import("./entities/news.entity").NewsEntity>;
    update(id: string, updateNewsDto: UpdateNewsDto, file: Express.Multer.File): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getImage(image: string, res: any): {
        status: HttpStatus;
        data: any;
    };
}
