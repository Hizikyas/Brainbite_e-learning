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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
let AIService = class AIService {
    openai;
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generateCourse(generateCourseDto) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        const prompt = this.buildPrompt(generateCourseDto);
        try {
            const response = await this.openai.chat.completions.create({
                model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert educational content creator. Generate structured course content in JSON format. Always return valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: 'json_object' },
            });
            const content = response.choices[0].message.content;
            if (!content) {
                throw new Error('AI response content is null or empty');
            }
            let parsedContent;
            try {
                parsedContent = JSON.parse(content);
            }
            catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.error('Raw content:', content);
                throw new Error('Failed to parse AI response as JSON');
            }
            return this.transformAIContent(parsedContent);
        }
        catch (error) {
            console.error('AI Generation Error:', error);
            if (error.message) {
                throw error;
            }
            throw new Error(`Failed to generate course content: ${error.message || 'Unknown error'}`);
        }
    }
    buildPrompt(dto) {
        return `
    Create a complete mini-course on the subject: "${dto.subject}".
    
    Additional context:
    - Level: ${dto.level || 'beginner'}
    - Age range: ${dto.age_range || 'all ages'}
    - Language: ${dto.language || 'English'}
    
    Generate a JSON object with the following exact structure:
    {
      "title": "Creative and engaging course title",
      "description": "2-3 sentence description of the course",
      "pages": [
        {
          "title": "Page 1 title",
          "content_md": "Markdown formatted content for page 1. Should be educational and engaging."
        },
        {
          "title": "Page 2 title", 
          "content_md": "Markdown formatted content for page 2."
        },
        {
          "title": "Page 3 title",
          "content_md": "Markdown formatted content for page 3."
        },
        {
          "title": "Page 4 title",
          "content_md": "Markdown formatted content for page 4."
        }
      ],
      "questions": [
        {
          "question_text": "A multiple choice question based on the content",
          "options": [
            {
              "option_text": "Correct answer",
              "is_correct": true
            },
            {
              "option_text": "Incorrect answer 1",
              "is_correct": false
            },
            {
              "option_text": "Incorrect answer 2", 
              "is_correct": false
            },
            {
              "option_text": "Incorrect answer 3",
              "is_correct": false
            }
          ]
        },
        {
          "question_text": "Second multiple choice question",
          "options": [
            {
              "option_text": "Correct answer",
              "is_correct": true
            },
            {
              "option_text": "Incorrect answer 1",
              "is_correct": false
            },
            {
              "option_text": "Incorrect answer 2",
              "is_correct": false
            }
          ]
        }
      ]
    }
    
    Ensure the content is accurate, educational, and appropriate for the specified level and age range.
    `;
    }
    transformAIContent(aiContent) {
        if (!aiContent.title || !aiContent.description) {
            throw new Error('AI response missing required fields: title or description');
        }
        if (!Array.isArray(aiContent.pages) || aiContent.pages.length !== 4) {
            throw new Error('AI response must contain exactly 4 pages');
        }
        if (!Array.isArray(aiContent.questions) || aiContent.questions.length !== 2) {
            throw new Error('AI response must contain exactly 2 questions');
        }
        return {
            title: aiContent.title,
            description: aiContent.description,
            pages: aiContent.pages.map((page, index) => {
                if (!page.title || !page.content_md) {
                    throw new Error(`Page ${index + 1} is missing title or content_md`);
                }
                return {
                    title: page.title,
                    content_md: page.content_md,
                };
            }),
            questions: aiContent.questions.map((question, qIndex) => {
                if (!question.question_text || !Array.isArray(question.options)) {
                    throw new Error(`Question ${qIndex + 1} is missing question_text or options`);
                }
                const correctOptions = question.options.filter((opt) => opt.is_correct);
                if (correctOptions.length !== 1) {
                    throw new Error(`Question ${qIndex + 1} must have exactly one correct option`);
                }
                return {
                    question_text: question.question_text,
                    options: question.options.map((option) => ({
                        option_text: option.option_text,
                        is_correct: option.is_correct || false,
                    })),
                };
            }),
        };
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AIService);
//# sourceMappingURL=ai.service.js.map