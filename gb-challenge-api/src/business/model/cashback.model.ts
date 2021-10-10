export class CashbackModel {
  private _dealer_cpf: string;
  private _cashback_amount: number;

  public get dealer_cpf(): string {
    return this._dealer_cpf;
  }

  public set dealer_cpf(value: string) {
    this._dealer_cpf = value;
  }

  public get cashback_amount(): number {
    return this._cashback_amount;
  }

  public set cashback_amount(value: number) {
    this._cashback_amount = value;
  }
}
