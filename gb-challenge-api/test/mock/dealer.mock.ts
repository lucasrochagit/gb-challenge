import { getCpf, getFullName, getId, getStr } from 'json-generator';
import { DealerModel } from '../../src/business/model/dealer.model';
import { DealerPasswordModel } from '../../src/business/model/dealer.password.model';
import { PasswordUtil } from '../../src/business/util/password.util';
import { Dealer } from '../../src/infrastructure/schema/dealer.schema';
import { DealerDTO } from '../../src/presentation/dto/dealer.dto';
import { UpdateDealerPasswordDTO } from '../../src/presentation/dto/dealer.password.dto';

export class DealerMock {
  static asDocumentRequest(info: any): Dealer {
    const result: Dealer = new Dealer();

    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = info.password;

    return result;
  }

  static asDocumentResponse(info: any): Dealer {
    const result: Dealer = new Dealer();

    result.id = info.id;
    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = info.password_encrypted;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asModelRequest(info: any): DealerModel {
    const result: DealerModel = new DealerModel();

    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = info.password;

    return result;
  }

  static asModelResponse(info: any): DealerModel {
    const result: DealerModel = new DealerModel();

    result.id = info.id;
    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asModelPasswordRequest(info: any): DealerPasswordModel {
    const result: DealerPasswordModel = new DealerPasswordModel();

    result.old_password = info.old_password;
    result.new_password = info.new_password;

    return result;
  }

  static asDTORequest(info: any): DealerDTO {
    const result: DealerDTO = {} as DealerDTO;

    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = info.password;

    return result;
  }

  static asDTOResponse(info: any): DealerDTO {
    const result: DealerDTO = {} as DealerDTO;

    result.id = info.id;
    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asDTOPasswordRequest(info: any): UpdateDealerPasswordDTO {
    const result: UpdateDealerPasswordDTO = new UpdateDealerPasswordDTO();

    result.old_password = info.old_password;
    result.new_password = info.new_password;

    return result;
  }

  static asJSONRequest(info: any): any {
    delete info.id;
    delete info.created_at;
    delete info.updated_at;
    return info;
  }

  static getInfo(): any {
    const _id: string = getId('objectId');
    const fullName: string = getFullName();
    const cpfWithMask: string = getCpf(true);
    const password: string = getStr(12, 'hex');
    const passwordEncrypted: string = PasswordUtil.encryptPassword(password);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    return {
      id: _id,
      full_name: fullName,
      cpf: cpfWithMask,
      email: `${fullName.toLowerCase().replace(' ', '')}@gmail.com`,
      password: password,
      password_encrypted: passwordEncrypted,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
