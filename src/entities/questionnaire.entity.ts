import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { Response } from './response.entity';
import { Question } from './question.entity';

@Entity('questionnaires')
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Question, (question) => question.questionnaire, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.questionnaire)
  answers: Answer[];

  @OneToMany(() => Response, (response) => response.questionnaire)
  responses: Response[];
}
