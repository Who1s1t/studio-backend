import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto): Promise<{
        title: string;
        shortDescription: string;
        fullDescription: string;
        author: string;
    } & import("./entities/news.entity").NewsEntity>;
    findAll(): Promise<import("./entities/news.entity").NewsEntity[]>;
    findOne(id: string): Promise<import("./entities/news.entity").NewsEntity>;
    update(id: string, updateNewsDto: UpdateNewsDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
