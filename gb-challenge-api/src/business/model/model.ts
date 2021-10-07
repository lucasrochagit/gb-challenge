export class Model {
  private _id: string;
  private _created_at: Date;
  private _updated_at: Date;

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public set created_at(value: Date) {
    this._created_at = value;
  }

  public get updated_at(): Date {
    return this._updated_at;
  }

  public set updated_at(value: Date) {
    this._updated_at = value;
  }
}
