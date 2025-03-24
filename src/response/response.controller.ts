import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from '../dto/create-response.dto';
import { Response } from '../entities/response.entity';

@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  create(@Body() createResponseDto: CreateResponseDto): Promise<Response> {
    return this.responseService.create(createResponseDto);
  }

  @Get('questionnaire/:questionnaireId')
  findByQuestionnaire(
    @Param('questionnaireId') questionnaireId: number,
  ): Promise<Response[]> {
    return this.responseService.findByQuestionnaire(questionnaireId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number): Promise<Response[]> {
    return this.responseService.findByUser(userId);
  }
}
