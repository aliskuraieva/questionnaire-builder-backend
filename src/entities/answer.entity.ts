import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Response } from './response.entity';
import { Question } from './question.entity';
import { Questionnaire } from './questionnaire.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @OneToMany(() => Response, (response) => response.answer)
  responses: Response[];

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.answers)
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;

  @Column()
  questionnaireId: number;
}
