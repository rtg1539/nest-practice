// nest g in transform --no-spec
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

// 결과값을 data로 매핑해 준다.
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    console.log('a');
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        console.log('a');
        return { data };
      }),
    );
  }
}
