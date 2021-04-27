import {
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { LogMiddleware } from './log.middleware';
import { AuthModule } from './auth/auth.module';
// import cors from 'cors';
// 전역 가드 추가
@Module({
  imports: [MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 미들웨어 추가
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      // 미들웨어를 예외시킬 경로
      .exclude({ path: '/movies', method: RequestMethod.GET })
      .forRoutes({
        // 미들웨어를 적용할 경로
        path: `/movies`,
        // 미들웨어를 적용할 HTTP Method
        method: RequestMethod.ALL,
      });
  }
}
