import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findByQuestion(questionId: number): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { question: { id: questionId } },
    });
  }

  findByQuestionnaire(questionnaireId: number): Promise<Answer[]> {
    return this.answerRepository.find({ where: { questionnaireId } });
  }
}
