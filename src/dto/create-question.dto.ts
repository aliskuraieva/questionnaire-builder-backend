import { IsString, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsString()
  type: 'text' | 'single-choice' | 'multiple-choice';

  @IsArray()
  choices: string[];

  @IsArray()
  answers: string[];
}
