import { IsOptional } from 'class-validator';

export class DTO {
  @IsOptional()
  id: string;

  @IsOptional()
  created_at: Date;

  @IsOptional()
  updated_at: Date;
}
