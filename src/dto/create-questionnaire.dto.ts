import { IsString, IsArray, IsOptional } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuestionnaireDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  questions: CreateQuestionDto[];
}
