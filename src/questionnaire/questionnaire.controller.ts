import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from '../dto/create-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  private readonly logger = new Logger(QuestionnaireController.name);

  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  async create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    this.logger.log('Received request to create a questionnaire');
    this.logger.log('Request body:', createQuestionnaireDto);

    try {
      const result = await this.questionnaireService.create(
        createQuestionnaireDto,
      );
      this.logger.log('Questionnaire created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating questionnaire:', error.stack);
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    this.logger.log(
      `Received request to get all questionnaires (page: ${page}, pageSize: ${pageSize})`,
    );

    try {
      const result = await this.questionnaireService.findAll({
        page,
        pageSize,
      });
      this.logger.log('Successfully retrieved questionnaires');
      return result;
    } catch (error) {
      this.logger.error('Error fetching questionnaires:', error.stack);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Received request to get questionnaire with id: ${id}`);

    try {
      const result = await this.questionnaireService.findOne(+id);
      if (!result) {
        this.logger.warn(`Questionnaire with id: ${id} not found`);
      } else {
        this.logger.log(`Successfully retrieved questionnaire with id: ${id}`);
      }
      return result;
    } catch (error) {
      this.logger.error(
        `Error fetching questionnaire with id: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Received request to delete questionnaire with id: ${id}`);

    try {
      const result = await this.questionnaireService.remove(+id);
      if (result) {
        this.logger.log(`Successfully deleted questionnaire with id: ${id}`);
      } else {
        this.logger.warn(`Questionnaire with id: ${id} not found for deletion`);
      }
      return result;
    } catch (error) {
      this.logger.error(
        `Error deleting questionnaire with id: ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
