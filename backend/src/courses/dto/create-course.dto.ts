import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested, IsUUID, IsOptional } from 'class-validator';

class PageDto {
  @IsString()
  title: string;

  @IsString()
  content_md: string;
}

class OptionDto {
  @IsString()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;
}

class QuestionDto {
  @IsString()
  question_text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  created_by: string;

  @IsBoolean()
  @IsOptional()
  is_published?: boolean = true;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageDto)
  pages: PageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}