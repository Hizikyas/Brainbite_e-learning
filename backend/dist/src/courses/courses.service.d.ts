import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<({
        course_pages: {
            title: string;
            content_md: string | null;
            id: string;
            created_at: Date;
            page_index: number;
            course_id: string;
        }[];
        questions: ({
            question_options: {
                option_text: string;
                is_correct: boolean;
                id: string;
                question_id: string;
            }[];
        } & {
            question_text: string;
            id: string;
            created_at: Date;
            course_id: string;
            type: string;
        })[];
    } & {
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        id: string;
        created_at: Date;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        course_pages: {
            title: string;
            content_md: string | null;
            id: string;
            created_at: Date;
            page_index: number;
            course_id: string;
        }[];
        questions: ({
            question_options: {
                option_text: string;
                is_correct: boolean;
                id: string;
                question_id: string;
            }[];
        } & {
            question_text: string;
            id: string;
            created_at: Date;
            course_id: string;
            type: string;
        })[];
    } & {
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        id: string;
        created_at: Date;
    }>;
    create(createCourseDto: CreateCourseDto): Promise<{
        course_pages: {
            title: string;
            content_md: string | null;
            id: string;
            created_at: Date;
            page_index: number;
            course_id: string;
        }[];
        questions: ({
            question_options: {
                option_text: string;
                is_correct: boolean;
                id: string;
                question_id: string;
            }[];
        } & {
            question_text: string;
            id: string;
            created_at: Date;
            course_id: string;
            type: string;
        })[];
    } & {
        title: string;
        subject: string;
        description: string | null;
        created_by: string;
        is_published: boolean;
        id: string;
        created_at: Date;
    }>;
}
