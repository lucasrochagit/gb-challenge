import { ConflictException, Injectable } from '@nestjs/common';
import { Serializer } from '../../common/serializer/serializer';
import { DealerRepository } from '../../infrastructure/repository/dealer.repository';
import {
    Dealer
} from '../../infrastructure/schema/dealer.schema';
import { DealerModel } from '../model/dealer.model';
import { PasswordUtil } from '../util/password.util';

@Injectable()
export class DealerService {
  constructor(
    private readonly _repository: DealerRepository,
    private readonly _serializer: Serializer<DealerModel, Dealer>,
  ) {}

  async create(item: DealerModel): Promise<DealerModel> {
    const exists: boolean = await this._repository.checkExists({
      $or: [
        {
          cpf: item.cpf,
        },
        {
          email: item.email,
        },
      ],
    });

    if (exists) {
      throw new ConflictException(
        'A dealer with same cpf or email already exists',
      );
    }

    const dealer: Dealer = this._serializer.serialize(item);
    dealer.password = PasswordUtil.encryptPassword(dealer.password);

    const result: Dealer = await this._repository.create(dealer);
    return this._serializer.deserialize(result, {
      ignoreFromTarget: ['updated_at', 'password'],
      mappingParams: { _id: 'id' },
    });
  }
}
