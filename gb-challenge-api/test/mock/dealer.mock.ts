import { getCpf, getFullName, getId, getStr } from 'json-generator';
import { PasswordUtil } from '../../src/business/util/password.util';
import { Dealer } from '../../src/infrastructure/schema/dealer.schema';

export class DealerMock {
  static asDocumentRequest(): Dealer {
    const info: any = this.getInfo();
    const result: Dealer = new Dealer();

    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = info.password;

    return result;
  }

  static asDocumentResponse(): Dealer {
    const info: any = this.getInfo();
    const passwordEncrypted: string = PasswordUtil.encryptPassword(
      info.password,
    );

    const result: Dealer = new Dealer();
    result.id = info.id;
    result.full_name = info.full_name;
    result.cpf = info.cpf;
    result.email = info.email;
    result.password = passwordEncrypted;
    result.created_at = info.created_at;
    result.updated_at = info.updated_at;

    return result;
  }

  static asJSONResponse(): any {
    return this.getInfo();
  }

  static asJSONRequest(): any {
    const result: any = this.getInfo();
    delete result.id;
    delete result.created_at;
    delete result.updated_at;
    return result;
  }

  private static getInfo(): any {
    const _id: string = getId('objectId');
    const fullName: string = getFullName();
    const cpfWithMask: string = getCpf(true);
    const password: string = getStr(12, 'hex');

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    return {
      id: _id,
      full_name: fullName,
      cpf: cpfWithMask,
      email: `${fullName.toLowerCase()}@gmail.com`,
      password: password,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
