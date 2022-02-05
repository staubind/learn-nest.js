import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dan',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, // loads entities from nest to use w/ db
      synchronize: true, // keeps db schema in sync - no manual migrations
    }),
  ],
})
export class AppModule {}
