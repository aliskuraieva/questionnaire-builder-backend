import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Answer } from './answer.entity';
import { Questionnaire } from './questionnaire.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Answer, (answer) => answer.responses)
  answer: Answer;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses)
  questionnaire: Questionnaire;
}
