import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adds validation at the application level and uses any validation pipes/decorators you've added to dto's, etc.
  app.useGlobalPipes(new ValidationPipe)

  await app.listen(3000);
}
bootstrap();
