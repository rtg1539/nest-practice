import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel
      .aggregate([
        {
          $match: {
            SNUM: { $in: [12, 17, 20, 23, 26, 29, 32, 35] },
            COMPLETE: 'COMPLETE',
          },
        },
        {
          $project: {
            DATA: {
              $filter: {
                input: '$DATA',
                as: 'data',
                cond: { $eq: ['$$data.NAME', 'TQ2'] },
              },
            },
            MISSIONS: {
              $filter: {
                input: '$DATA',
                as: 'data',
                cond: { $eq: ['$$data.NAME', 'Q0'] },
              },
            },
          },
        },
        { $unwind: '$DATA' },
        { $unwind: '$MISSIONS' },
        {
          $group: {
            _id: '$MISSIONS.NUMBER_1',
            total: { $sum: 1 },
            answer1: { $sum: { $cond: [{ $eq: ['$DATA.1', '1'] }, 1, 0] } },
            answer2: { $sum: { $cond: [{ $eq: ['$DATA.1', '2'] }, 1, 0] } },
            answer3: { $sum: { $cond: [{ $eq: ['$DATA.1', '3'] }, 1, 0] } },
            answer4: { $sum: { $cond: [{ $eq: ['$DATA.1', '4'] }, 1, 0] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }
}
