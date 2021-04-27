import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth.guard';

// 전역 가드 추가
@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
