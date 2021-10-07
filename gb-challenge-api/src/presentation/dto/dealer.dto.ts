import {
    IsDefined,
    IsEmail,
    IsNotEmpty, IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';
import { IsAlphaWithSpaces } from '../validators/is.alpha.with.spaces';
import { IsValidCPF } from '../validators/is.valid.cpf';
import { ReadonlyParamDTO } from './readonly.param.dto';

export type DealerDTO = CreateDealerDTO;

export class CreateDealerDTO extends ReadonlyParamDTO {
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
