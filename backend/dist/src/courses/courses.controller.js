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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const ai_service_1 = require("../ai/ai.service");
const auth_guard_1 = require("../auth/auth.guard");
const generate_course_dto_1 = require("./dto/generate-course.dto");
const create_course_dto_1 = require("./dto/create-course.dto");
let CoursesController = class CoursesController {
    coursesService;
    aiService;
    constructor(coursesService, aiService) {
        this.coursesService = coursesService;
        this.aiService = aiService;
    }
    findAll(req) {
        return this.coursesService.findAll(req.user.sub);
    }
    findOne(id, req) {
        return this.coursesService.findOne(id, req.user.sub);
    }
    create(createCourseDto) {
        return this.coursesService.create(createCourseDto);
    }
    async generate(generateCourseDto, req) {
        const aiCourse = await this.aiService.generateCourse(generateCourseDto);
        const createCourseDto = {
            title: aiCourse.title,
            subject: generateCourseDto.subject,
            description: aiCourse.description,
            created_by: req.user.sub,
            is_published: true,
            pages: aiCourse.pages,
            questions: aiCourse.questions,
        };
        const course = await this.coursesService.create(createCourseDto);
        if (!course) {
            throw new Error('Failed to create course');
        }
        return {
            message: 'Course generated successfully',
            course_id: course.id,
            course
        };
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_course_dto_1.GenerateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "generate", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService,
        ai_service_1.AIService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map