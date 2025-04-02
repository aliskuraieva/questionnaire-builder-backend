import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
      migrations: [path.join(__dirname, 'src/migrations/**/*{.ts,.js}')],
      migrationsRun: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : undefined,
    }),
    QuestionnaireModule,
  ],
})
export class AppModule {}
