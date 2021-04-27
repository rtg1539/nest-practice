import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  );
  // 글로벌 미들웨어
  app.use(helmet());
  await app.listen(3001);
}
bootstrap();
