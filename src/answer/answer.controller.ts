import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.create(createAnswerDto);
  }

  @Get('question/:questionId')
  findByQuestion(@Param('questionId') questionId: number): Promise<Answer[]> {
    return this.answerService.findByQuestion(questionId);
  }

  @Get('questionnaire/:questionnaireId')
  findByQuestionnaire(
    @Param('questionnaireId') questionnaireId: number,
  ): Promise<Answer[]> {
    return this.answerService.findByQuestionnaire(questionnaireId);
  }
}
