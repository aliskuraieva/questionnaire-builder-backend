import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Question } from '../entities/question.entity';
import { CreateQuestionnaireDto } from '../dto/create-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionnaireDto: CreateQuestionnaireDto) {
    const { title, description, questions } = createQuestionnaireDto;

    const questionnaire = this.questionnaireRepository.create({
      title,
      description,
    });
    await this.questionnaireRepository.save(questionnaire);

    const questionEntities = questions.map((q) =>
      this.questionRepository.create({ ...q, questionnaire }),
    );
    await this.questionRepository.save(questionEntities);

    return { ...questionnaire, questions: questionEntities };
  }

  async findAll({ page, pageSize }) {
    const [items, totalCount] = await this.questionnaireRepository.findAndCount(
      {
        skip: (page - 1) * pageSize,
        take: pageSize,
      },
    );

    return { items, totalCount };
  }

  async findOne(id: number) {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id },
    });

    if (!questionnaire) {
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    }

    return questionnaire;
  }

  async remove(id: number) {
    this.logger.log(`Attempting to delete questionnaire with ID: ${id}`);

    await this.questionRepository.delete({ questionnaire: { id } });

    const result = await this.questionnaireRepository.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Questionnaire with ID ${id} not found`);
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    }

    this.logger.log(`Successfully deleted questionnaire with ID: ${id}`);

    return { message: 'Questionnaire successfully deleted' };
  }
}
