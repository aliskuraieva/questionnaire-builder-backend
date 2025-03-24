import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  findByQuestionnaire(questionnaireId: number) {
    return this.questionRepository.find({
      where: {
        questionnaire: {
          id: questionnaireId,
        },
      },
    });
  }

  async findOne(id: number, questionnaireId: number) {
    const question = await this.questionRepository.findOne({
      where: {
        id,
        questionnaire: {
          id: questionnaireId,
        },
      },
    });
    if (!question) {
      throw new Error(
        `Question with ID ${id} not found in questionnaire ${questionnaireId}`,
      );
    }
    return question;
  }
}
