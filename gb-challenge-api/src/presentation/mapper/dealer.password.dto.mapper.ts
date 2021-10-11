import { Injectable } from '@nestjs/common';
import { DealerPasswordModel } from '../../business/model/dealer.password.model';
import { IMapper } from '../../common/interface/mapper/mapper.interface';
import {
  DealerPasswordDTO,
  UpdateDealerPasswordDTO,
} from '../dto/dealer.password.dto';

@Injectable()
export class DealerPasswordDTOMapper
  implements IMapper<DealerPasswordDTO, DealerPasswordModel>
{
  serialize(target: DealerPasswordModel): UpdateDealerPasswordDTO {
    throw new Error('Method not implemented.');
  }
  
  deserialize(source: UpdateDealerPasswordDTO): DealerPasswordModel {
    const result: DealerPasswordModel = new DealerPasswordModel();
    if (!source) return result;

    if (source.old_password) result.old_password = source.old_password;
    if (source.new_password) result.new_password = source.new_password;

    return result;
  }
}
