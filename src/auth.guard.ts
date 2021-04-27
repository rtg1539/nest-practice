// nest g gu auth --no-spec
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // Reflector를 이용해서 metadata를 가져옴

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return false; // block => Forbidden resource error
    // return true; // pass

    const [roles] =
      this.reflector.get<number[]>('roles', context.getHandler()) || [];

    console.log(roles);
    // roles가 없으면 권한 여부 상관없이 pass
    if (!roles) return true;

    const req = context.switchToHttp().getRequest<Request>();
    console.log(req.header('accept'));

    console.log(roles & 1);

    return true;
  }
}
