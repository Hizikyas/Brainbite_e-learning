import { GenerateCourseDto } from '../courses/dto/generate-course.dto';
export declare class AIService {
    private openai;
    constructor();
    generateCourse(generateCourseDto: GenerateCourseDto): Promise<{
        title: any;
        description: any;
        pages: any;
        questions: any;
    }>;
    private buildPrompt;
    private transformAIContent;
}
