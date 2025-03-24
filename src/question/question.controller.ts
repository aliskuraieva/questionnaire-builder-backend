import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get(':questionnaireId')
  findAll(@Param('questionnaireId') questionnaireId: string) {
    return this.questionService.findByQuestionnaire(+questionnaireId);
  }

  @Get(':questionnaireId/:id')
  findOne(@Param('id') id: string, @Param('questionnaireId') questionnaireId: string) {
    return this.questionService.findOne(+id, +questionnaireId);
  }
}
