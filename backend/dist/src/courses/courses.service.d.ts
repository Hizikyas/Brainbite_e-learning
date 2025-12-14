import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
}
