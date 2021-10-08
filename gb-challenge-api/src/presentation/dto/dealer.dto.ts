import {
  Equals,
  IsDefined,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsAlphaWithSpaces } from '../validator/is.alpha.with.spaces';
import { IsValidCPF } from '../validator/is.valid.cpf';
import { ReadOnlyDTO } from './readonly.dto';

export type DealerDTO = CreateDealerDTO & UpdateDealerDTO;

export class CreateDealerDTO extends ReadOnlyDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces()
  full_name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\d\d\d.\d\d\d.\d\d\d-\d\d)$/, {
    message: 'cpf must follow the pattern: XXX.XXX.XX-XX',
  })
  @IsValidCPF()
  cpf: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class UpdateDealerDTO extends ReadOnlyDTO {
  @ValidateIf((dto) => dto.full_name !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces()
  full_name: string;

  @ValidateIf((dto) => dto.cpf !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\d\d\d.\d\d\d.\d\d\d-\d\d)$/, {
    message: 'cpf must follow the pattern: XXX.XXX.XX-XX',
  })
  @IsValidCPF()
  cpf: string;

  @ValidateIf((dto) => dto.email !== undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Equals(undefined, {
    message:
      'password cannot be updated from here, please use the appropiate endpoint for this action',
  })
  password: string;
}

export class MethodByIdDealerDTO {
  @IsMongoId()
  dealer_id: string;
}
