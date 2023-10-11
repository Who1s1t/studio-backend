"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const news_service_1 = require("./news.service");
const create_news_dto_1 = require("./dto/create-news.dto");
const update_news_dto_1 = require("./dto/update-news.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../guard/admin.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../utils/file-upload.utils");
let NewsController = exports.NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    create(createNewsDto, file) {
        return this.newsService.create(createNewsDto, file);
    }
    findAll() {
        return this.newsService.findAll();
    }
    findOne(id) {
        return this.newsService.findOne(+id);
    }
    update(id, updateNewsDto, file) {
        return this.newsService.update(+id, updateNewsDto, file);
    }
    remove(id) {
        return this.newsService.remove(+id);
    }
    getImage(image, res) {
        const response = res.sendFile(image, { root: './uploads/img/news' });
        return {
            status: common_1.HttpStatus.OK,
            data: response,
        };
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                shortDescription: { type: 'string' },
                fullDescription: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/img/news',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_dto_1.CreateNewsDto, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                shortDescription: { type: 'string' },
                fullDescription: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/img/news',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_news_dto_1.UpdateNewsDto, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('img/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "getImage", null);
exports.NewsController = NewsController = __decorate([
    (0, common_1.Controller)('news'),
    (0, swagger_1.ApiTags)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map