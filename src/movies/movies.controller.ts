// 터미널에서 nest g co movies [--no-spec] 명령어 실행 [optional]
import {
  Controller,
  Header,
  HttpCode,
  Param,
  Query,
  Body,
  Ip,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  // 생성자 파라미터로 서비스 추가 => controller의 생성자에 provider(@Injectable()) 객체들을 추가
  constructor(private readonly moviesService: MoviesService) {}

  // Get
  @Get()
  // Headers 속성을 추가해 준다.
  @Header('Cache-Control', 'none')
  // Http statusCode를 설정해 준다.
  @HttpCode(204)
  getAll(@Ip() ip: string): string {
    // @Ip를 사용해서 ip를 받아올 수 있다.
    console.log(ip);
    return 'this will return all movies';
  }

  // Query: /movies/search?year=2021
  @Get('/search')
  search(@Query('year') year: number) {
    console.log(typeof year);
    return `this year is ${year}`;
  }

  // Param /movies/id
  @Get('/:id')
  getOne(@Param('id') movieId: string): string {
    // service의 메서드 호출
    return this.moviesService.getOne(movieId);
  }

  // Body
  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    // validation pipe를 추가하지 않으면 타입에 맞지 않는 값이 넘어와도 에러는 나지 않는다.
    // pipe를 추가하면 타입에 맞지 않는 값이 넘어오면 에러를 발생 시킨다.
    console.log(movieData);
    return movieData;
  }

  // Body
  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      movieId,
      ...updateData,
    };
  }

  // Req, Res 사용하지 않는것을 추천
  @Get('/home/a')
  home(@Req() request: Request, @Res() response: Response) {
    console.log(Object.keys(request));
    console.log(Object.keys(response));
    return 'this is home';
  }

  /*
  @Request(), @Req()	req
  @Response(), @Res()*	res
  @Next()	next
  @Session()	req.session
  @Param(key?: string)	req.params / req.params[key]
  @Body(key?: string)	req.body / req.body[key]
  @Query(key?: string)	req.query / req.query[key]
  @Headers(name?: string)	req.headers / req.headers[name]
  @Ip()	req.ip
  @HostParam()	req.hosts
  */
}
