export class DealerModel {
  private _id: string;
  private _full_name: string;
  private _cpf: string;
  private _email: string;
  private _password: string;
  private _created_at: string;
  private _updated_at: string;

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

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

  public get created_at(): string {
    return this._created_at;
  }

  public set created_at(value: string) {
    this._created_at = value;
  }

  public get updated_at(): string {
    return this._updated_at;
  }

  public set updated_at(value: string) {
    this._updated_at = value;
  }
}
