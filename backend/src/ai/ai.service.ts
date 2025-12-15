import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GenerateCourseDto } from '../courses/dto/generate-course.dto';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateCourse(generateCourseDto: GenerateCourseDto) {
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
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Raw content:', content);
        throw new Error('Failed to parse AI response as JSON');
      }

      // Validate and transform the response
      return this.transformAIContent(parsedContent);
    } catch (error: any) {
      console.error('AI Generation Error:', error);
      if (error.message) {
        throw error;
      }
      throw new Error(`Failed to generate course content: ${error.message || 'Unknown error'}`);
    }
  }

  private buildPrompt(dto: GenerateCourseDto): string {
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

  private transformAIContent(aiContent: any) {
    // Validate required fields
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
      pages: aiContent.pages.map((page: any, index: number) => {
        if (!page.title || !page.content_md) {
          throw new Error(`Page ${index + 1} is missing title or content_md`);
        }
        return {
        title: page.title,
        content_md: page.content_md,
        };
      }),
      questions: aiContent.questions.map((question: any, qIndex: number) => {
        if (!question.question_text || !Array.isArray(question.options)) {
          throw new Error(`Question ${qIndex + 1} is missing question_text or options`);
        }
        
        const correctOptions = question.options.filter((opt: any) => opt.is_correct);
        if (correctOptions.length !== 1) {
          throw new Error(`Question ${qIndex + 1} must have exactly one correct option`);
        }

        return {
        question_text: question.question_text,
        options: question.options.map((option: any) => ({
          option_text: option.option_text,
            is_correct: option.is_correct || false,
      })),
        };
      }),
    };
  }
}