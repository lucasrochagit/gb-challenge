export class DealerPasswordModel {
  private _old_password: string;
  private _new_password: string;

  public get old_password(): string {
    return this._old_password;
  }

  public set old_password(value: string) {
    this._old_password = value;
  }

  public get new_password(): string {
    return this._new_password;
  }

  public set new_password(value: string) {
    this._new_password = value;
  }
}
