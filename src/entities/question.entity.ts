import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column()
  type: string;

  @Column('text', { array: true })
  choices: string[];

  @Column('text', { array: true })
  answers: string[];

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  questionnaire: Questionnaire;
}

