export class DealerPasswordModel {
  private _current_password: string;
  private _new_password: string;

  public get current_password(): string {
    return this._current_password;
  }

  public set current_password(value: string) {
    this._current_password = value;
  }

  public get new_password(): string {
    return this._new_password;
  }

  public set new_password(value: string) {
    this._new_password = value;
  }
}
