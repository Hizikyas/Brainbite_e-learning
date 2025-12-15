import { CoursesService } from './courses.service';
import { AIService } from '../ai/ai.service';
import { GenerateCourseDto } from './dto/generate-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    private readonly aiService;
    constructor(coursesService: CoursesService, aiService: AIService);
    findAll(req: any): Promise<({
        course_pages: {
            id: string;
            title: string;
            created_at: Date;
            page_index: number;
            course_id: string;
            content_md: string | null;
        }[];
        questions: ({
            question_options: {
                id: string;
                question_id: string;
                option_text: string;
                is_correct: boolean;
            }[];
        } & {
            id: string;
            created_at: Date;
            course_id: string;
            question_text: string;
            type: string;
        })[];
    } & {
        id: string;
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        created_at: Date;
    })[]>;
    findOne(id: string, req: any): Promise<{
        course_pages: {
            id: string;
            title: string;
            created_at: Date;
            page_index: number;
            course_id: string;
            content_md: string | null;
        }[];
        questions: ({
            question_options: {
                id: string;
                question_id: string;
                option_text: string;
                is_correct: boolean;
            }[];
        } & {
            id: string;
            created_at: Date;
            course_id: string;
            question_text: string;
            type: string;
        })[];
    } & {
        id: string;
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        created_at: Date;
    }>;
    create(createCourseDto: CreateCourseDto): Promise<{
        course_pages: {
            id: string;
            title: string;
            created_at: Date;
            page_index: number;
            course_id: string;
            content_md: string | null;
        }[];
        questions: ({
            question_options: {
                id: string;
                question_id: string;
                option_text: string;
                is_correct: boolean;
            }[];
        } & {
            id: string;
            created_at: Date;
            course_id: string;
            question_text: string;
            type: string;
        })[];
    } & {
        id: string;
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        created_at: Date;
    }>;
    generate(generateCourseDto: GenerateCourseDto, req: any): Promise<{
        message: string;
        course_id: string;
        course: {
            course_pages: {
                id: string;
                title: string;
                created_at: Date;
                page_index: number;
                course_id: string;
                content_md: string | null;
            }[];
            questions: ({
                question_options: {
                    id: string;
                    question_id: string;
                    option_text: string;
                    is_correct: boolean;
                }[];
            } & {
                id: string;
                created_at: Date;
                course_id: string;
                question_text: string;
                type: string;
            })[];
        } & {
            id: string;
            title: string;
            subject: string;
            description: string | null;
            created_by: string;
            is_published: boolean;
            created_at: Date;
        };
    }>;
}
