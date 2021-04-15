import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  getOne(movieId: string) {
    return `this will return one ${movieId}`;
  }
}
