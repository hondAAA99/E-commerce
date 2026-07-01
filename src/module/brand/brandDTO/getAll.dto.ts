import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class getAllBrandsQuery {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsString()
  search: string;
}
