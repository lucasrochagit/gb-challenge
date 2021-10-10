import { ReadOnlyModel } from './readonly.model';

export class SaleModel extends ReadOnlyModel {
  private _code: string;
  private _value: number;
  private _date: string;
  private _status: string;
  private _cashback_percentage: number;
  private _cashback_value: number;
  private _dealer_cpf: string;

  public get code(): string {
    return this._code;
  }

  public set code(value: string) {
    this._code = value;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get date(): string {
    return this._date;
  }

  public set date(value: string) {
    this._date = value;
  }

  public get status(): string {
    return this._status;
  }

  public set status(value: string) {
    this._status = value;
  }

  public get cashback_percentage(): number {
    return this._cashback_percentage;
  }

  public set cashback_percentage(value: number) {
    this._cashback_percentage = value;
  }

  public get cashback_value(): number {
    return this._cashback_value;
  }

  public set cashback_value(value: number) {
    this._cashback_value = value;
  }

  public get dealer_cpf(): string {
    return this._dealer_cpf;
  }

  public set dealer_cpf(value: string) {
    this._dealer_cpf = value;
  }
}
