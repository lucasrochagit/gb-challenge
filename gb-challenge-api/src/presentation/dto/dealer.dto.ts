import {
    IsDefined,
    IsEmail,
    IsNotEmpty, IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';
import { IsAlphaWithSpaces } from '../validator/is.alpha.with.spaces';
import { IsValidCPF } from '../validator/is.valid.cpf';
import { DTO } from './dto';

export type DealerDTO = CreateDealerDTO;

export class CreateDealerDTO extends DTO {
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
