import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export type DealerPasswordDTO = UpdateDealerPasswordDTO;

export class UpdateDealerPasswordDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  current_password: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  new_password: string;
}

export class MethodByIdDealerPasswordDTO {
  @IsMongoId()
  dealer_id: string;
}
