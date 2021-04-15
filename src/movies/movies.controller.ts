// 터미널에서 nest g co movies [--no-spec] 명령어 실행 [optional]
import {
  Body,
  Controller,
  Get,
  Header, HttpCode, Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('movies')
export class MoviesController {
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
    return `this will return one ${movieId}`;
  }

  // Body
  @Post()
  create(@Body() movieData) {
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
