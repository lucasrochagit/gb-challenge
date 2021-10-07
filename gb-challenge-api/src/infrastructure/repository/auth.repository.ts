import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { BaseRepository } from './base/repository.base';

@Injectable()
export class AuthRepository extends BaseRepository<AuthDocument, Auth> {
  constructor(
    @InjectModel(Auth.name) protected readonly _model: Model<AuthDocument>,
  ) {
    super(_model);
  }
}
