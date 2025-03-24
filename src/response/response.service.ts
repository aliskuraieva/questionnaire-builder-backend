import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from '../entities/response.entity';
import { CreateResponseDto } from '../dto/create-response.dto';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  create(createResponseDto: CreateResponseDto): Promise<Response> {
    const response = this.responseRepository.create(createResponseDto);
    return this.responseRepository.save(response);
  }

  async findByQuestionnaire(questionnaireId: number): Promise<Response[]> {
    return this.responseRepository.find({
      where: {
        questionnaire: { id: questionnaireId },
      },
      relations: ['questionnaire'],
    });
  }

  async findByUser(userId: number): Promise<Response[]> {
    return this.responseRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
