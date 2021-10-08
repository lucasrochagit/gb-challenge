import {
  Equals,
  IsDefined,
  IsHexadecimal,
  IsJWT,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsValidLogin } from '../validator/is.valid.login';

export type AuthDTO = RefreshTokenDTO & {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
};

export class AuthRequestDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsValidLogin()
  login: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class RefreshTokenDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  access_token: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  refresh_token: string;
}
