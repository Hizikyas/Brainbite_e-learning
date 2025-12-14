declare class PageDto {
    title: string;
    content_md: string;
}
declare class OptionDto {
    option_text: string;
    is_correct: boolean;
}
declare class QuestionDto {
    question_text: string;
    options: OptionDto[];
}
export declare class CreateCourseDto {
    title: string;
    subject: string;
    description?: string;
    created_by: string;
    is_published?: boolean;
    pages: PageDto[];
    questions: QuestionDto[];
}
export {};
