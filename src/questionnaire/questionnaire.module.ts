import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire, Question])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  exports: [QuestionnaireService],
})
export class QuestionnaireModule {}
