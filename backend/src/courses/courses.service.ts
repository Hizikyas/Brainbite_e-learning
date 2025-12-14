import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
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

  async findOne(id: string, userId: string) {
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
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.$transaction(async (tx) => {
      // Create course
      const course = await tx.courses.create({
        data: {
          title: createCourseDto.title,
          subject: createCourseDto.subject,
          description: createCourseDto.description,
          created_by: createCourseDto.created_by,
          is_published: createCourseDto.is_published,
        },
      });

      // Create pages
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

      // Create questions with options
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

      // Return course with all relations
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
}