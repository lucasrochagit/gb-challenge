import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import {
  Dealer,
  DealerDocument,
} from '../../infrastructure/schema/dealer.schema';
import { DealerModelMapper } from '../mapper/dealer.model.mapper';
import { DealerModel } from '../model/dealer.model';
import { DealerPasswordModel } from '../model/dealer.password.model';
import { PasswordUtil } from '../util/password.util';

@Injectable()
export class DealerService {
  constructor(
    private readonly _repository: DealerRepository,
    private readonly _mapper: DealerModelMapper,
  ) {}

  async create(item: DealerModel): Promise<DealerModel> {
    await this.checkExistsByUniqueFields({
      $or: [{ cpf: item.cpf }, { email: item.email }],
    });

    const dealer: Dealer = this._mapper.deserialize(item);
    dealer.password = PasswordUtil.encryptPassword(dealer.password);
    return this._mapper.serialize(await this._repository.create(dealer));
  }

  async find(): Promise<DealerModel[]> {
    const result: Dealer[] = await this._repository.find();
    return result.map((item: Dealer) => this._mapper.serialize(item));
  }

  async findById(_id: string): Promise<DealerModel> {
    const result: Dealer = await this._repository.findOne({ _id });
    if (!result) {
      throw new NotFoundException('Dealer not found or already removed.');
    }
    return this._mapper.serialize(result);
  }

  async updateById(_id: string, item: DealerModel): Promise<DealerModel> {
    const checkExistsQuery = { _id: { $ne: _id }, $or: [] };
    if (item.cpf) checkExistsQuery.$or.push({ cpf: item.cpf });
    if (item.email) checkExistsQuery.$or.push({ email: item.email });

    if (checkExistsQuery.$or.length) {
      await this.checkExistsByUniqueFields(checkExistsQuery);
    }

    const dealer: Dealer = this._mapper.deserialize(item);
    const result: Dealer = await this._repository.updateOne({ _id }, dealer);
    if (!result) {
      throw new NotFoundException('Dealer not found or already removed.');
    }
    return this._mapper.serialize(result);
  }

  async updatePassword(
    _id: string,
    passwords: DealerPasswordModel,
  ): Promise<void> {
    const dealer: Dealer = await this._repository.findOne({ _id });

    if (!dealer) {
      throw new NotFoundException('Dealer not found or already removed.');
    }

    if (!PasswordUtil.isSamePassword(passwords.current_password, dealer.password)) {
      throw new BadRequestException(
        'Old password does not match with current password.',
      );
    }

    dealer.password = PasswordUtil.encryptPassword(passwords.new_password);
    await this._repository.updateOne({ _id }, dealer);
  }

  async deleteById(_id: string): Promise<void> {
    const result: Dealer = await this._repository.deleteOne({ _id });
    if (!result) {
      throw new NotFoundException('Dealer not found or already removed.');
    }
  }

  private async checkExistsByUniqueFields(
    filter: FilterQuery<DealerDocument>,
  ): Promise<void> {
    const exists: boolean = await this._repository.checkExists(filter);

    if (exists) {
      throw new ConflictException(
        'A dealer with same cpf or email already exists.',
      );
    }
  }
}
