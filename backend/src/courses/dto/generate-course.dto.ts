import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class GenerateCourseDto {
  @IsString()
  @MinLength(3)
  subject: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  age_range?: string;

  @IsOptional()
  @IsString()
  language?: string = 'en';
}