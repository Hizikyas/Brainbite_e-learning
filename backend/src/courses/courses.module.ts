import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AIService } from '../ai/ai.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, AIService],
})
export class CoursesModule {}