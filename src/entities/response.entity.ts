import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Questionnaire } from './questionnaire.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Answer, (answer) => answer.responses)
  @JoinColumn({ name: 'answerId' })
  answer: Answer;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses)
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;

  @Column()
  questionnaireId: number;
}
