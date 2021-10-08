import { ReadOnlyModel } from './readonly.model';

export class AuthModel extends ReadOnlyModel {
  private _access_token: string;
  private _token_type: string;
  private _refresh_token: string;
  private _expires_in: number;
  private _owner: string;

  public get access_token(): string {
    return this._access_token;
  }

  public set access_token(value: string) {
    this._access_token = value;
  }

  public get token_type(): string {
    return this._token_type;
  }

  public set token_type(value: string) {
    this._token_type = value;
  }

  public get refresh_token(): string {
    return this._refresh_token;
  }

  public set refresh_token(value: string) {
    this._refresh_token = value;
  }

  public get expires_in(): number {
    return this._expires_in;
  }

  public set expires_in(value: number) {
    this._expires_in = value;
  }

  public get owner(): string {
    return this._owner;
  }

  public set owner(value: string) {
    this._owner = value;
  }
}
