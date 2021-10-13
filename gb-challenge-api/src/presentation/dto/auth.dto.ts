import {
  Equals,
  IsDefined,
  IsHexadecimal,
  IsJWT,
  IsNotEmpty,
  IsString,
  Length,
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
  @Length(64)
  refresh_token: string;
}
