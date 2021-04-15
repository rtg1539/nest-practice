// nest g mo movies --no-spec
import { Global, Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Global() // 모듈을 import/export 하지 않고 provider를 사용
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
