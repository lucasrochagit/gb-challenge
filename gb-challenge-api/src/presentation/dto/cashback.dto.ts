import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
} from 'class-validator';
import { IsValidCPF } from '../validator/is.valid.cpf';

export type CashbackDTO = {
  dealer_cpf: string;
  cashback_amount: number;
};

export class FindCashbackByDealerCpfDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\d\d\d.\d\d\d.\d\d\d-\d\d)$/, {
    message: 'cpf must follow the pattern: XXX.XXX.XX-XX',
  })
  @IsValidCPF()
  cpf: string;
}
