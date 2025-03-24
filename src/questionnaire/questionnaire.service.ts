import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from '../entities/questionnaire.entity';
import { CreateQuestionnaireDto } from '../dto/create-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  create(createQuestionnaireDto: CreateQuestionnaireDto) {
    const questionnaire = this.questionnaireRepository.create(createQuestionnaireDto);
    return this.questionnaireRepository.save(questionnaire);
  }

  findAll() {
    return this.questionnaireRepository.find();
  }

  findOne(id: number) {
    return this.questionnaireRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.questionnaireRepository.delete(id);
  }
}
