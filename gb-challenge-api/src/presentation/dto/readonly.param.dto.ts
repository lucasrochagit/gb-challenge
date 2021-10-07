import { IsOptional } from 'class-validator';

export class ReadonlyParamDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  created_at: Date;

  @IsOptional()
  updated_at: Date;
}
