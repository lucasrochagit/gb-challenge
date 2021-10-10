import {
  Equals,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsValidCPF } from '../validator/is.valid.cpf';
import { ReadOnlyDTO } from './readonly.dto';

export type SaleDTO = CreateSaleDTO & UpdateSaleDTO;

export class CreateSaleDTO extends ReadOnlyDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(20)
  code: string;

  @IsDefined()
  @IsNumber()
  @Min(0)
  value: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsValidCPF()
  dealer_cpf: string;

  @Equals(undefined, {
    message: 'status is an automatically generated parameter and cannot be set',
  })
  status: string;

  @Equals(undefined, {
    message:
      'cashback_percentage is an automatically generated parameter and cannot be set',
  })
  cashback_percentage: number;

  @Equals(undefined, {
    message:
      'cashback_value is an automatically generated parameter and cannot be set',
  })
  cashback_value: number;
}

export class UpdateSaleDTO extends ReadOnlyDTO {
  @ValidateIf((dto) => dto.code !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(20)
  code: string;

  @ValidateIf((dto) => dto.value !== undefined)
  @IsDefined()
  @IsNumber()
  @Min(0)
  value: number;

  @ValidateIf((dto) => dto.date !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  date: string;

  @ValidateIf((dto) => dto.dealer_cpf !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsValidCPF()
  dealer_cpf: string;

  @Equals(undefined, {
    message: 'status is an automatically generated parameter and cannot be set',
  })
  status: string;

  @Equals(undefined, {
    message:
      'cashback_percentage is an automatically generated parameter and cannot be set',
  })
  cashback_percentage: number;

  @Equals(undefined, {
    message:
      'cashback_value is an automatically generated parameter and cannot be set',
  })
  cashback_value: number;
}

export class MethodByIdSaleDTO {
  @IsMongoId()
  sale_id: string;
}
