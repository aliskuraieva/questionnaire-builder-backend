import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from '../dto/create-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get()
  findAll() {
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnaireService.remove(+id);
  }
}
