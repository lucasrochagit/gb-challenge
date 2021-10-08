import { ReadOnlyModel } from './readonly.model';

export class DealerModel extends ReadOnlyModel {
  private _full_name: string;
  private _cpf: string;
  private _email: string;
  private _password: string;

  public get full_name(): string {
    return this._full_name;
  }

  public set full_name(value: string) {
    this._full_name = value;
  }

  public get cpf(): string {
    return this._cpf;
  }

  public set cpf(value: string) {
    this._cpf = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }
}
