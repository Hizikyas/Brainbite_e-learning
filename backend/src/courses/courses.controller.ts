import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AIService } from '../ai/ai.service';
import { AuthGuard } from '../auth/auth.guard';
import { GenerateCourseDto } from './dto/generate-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly aiService: AIService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    return this.coursesService.findAll(req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.coursesService.findOne(id, req.user.sub);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async generate(@Body() generateCourseDto: GenerateCourseDto, @Request() req) {
    // Generate course content with AI
    const aiCourse = await this.aiService.generateCourse(generateCourseDto);
    
    // Create course in database
    const createCourseDto: CreateCourseDto = {
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
}