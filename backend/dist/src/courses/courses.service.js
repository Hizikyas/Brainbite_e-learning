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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        return this.prisma.courses.findMany({
            where: {
                OR: [
                    { is_published: true },
                    { created_by: userId }
                ]
            },
            include: {
                course_pages: {
                    orderBy: { page_index: 'asc' }
                },
                questions: {
                    include: {
                        question_options: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });
    }
    async findOne(id, userId) {
        const course = await this.prisma.courses.findFirst({
            where: {
                id,
                OR: [
                    { is_published: true },
                    { created_by: userId }
                ]
            },
            include: {
                course_pages: {
                    orderBy: { page_index: 'asc' }
                },
                questions: {
                    include: {
                        question_options: true
                    }
                }
            }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async create(createCourseDto) {
        return this.prisma.$transaction(async (tx) => {
            const course = await tx.courses.create({
                data: {
                    title: createCourseDto.title,
                    subject: createCourseDto.subject,
                    description: createCourseDto.description,
                    created_by: createCourseDto.created_by,
                    is_published: createCourseDto.is_published,
                },
            });
            for (let i = 0; i < createCourseDto.pages.length; i++) {
                await tx.course_pages.create({
                    data: {
                        course_id: course.id,
                        page_index: i,
                        title: createCourseDto.pages[i].title,
                        content_md: createCourseDto.pages[i].content_md,
                    },
                });
            }
            for (const question of createCourseDto.questions) {
                const createdQuestion = await tx.questions.create({
                    data: {
                        course_id: course.id,
                        question_text: question.question_text,
                        type: 'mcq',
                    },
                });
                for (const option of question.options) {
                    await tx.question_options.create({
                        data: {
                            question_id: createdQuestion.id,
                            option_text: option.option_text,
                            is_correct: option.is_correct,
                        },
                    });
                }
            }
            const fullCourse = await tx.courses.findUnique({
                where: { id: course.id },
                include: {
                    course_pages: {
                        orderBy: { page_index: 'asc' }
                    },
                    questions: {
                        include: {
                            question_options: true
                        }
                    }
                }
            });
            if (!fullCourse) {
                throw new Error('Failed to retrieve created course');
            }
            return fullCourse;
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map