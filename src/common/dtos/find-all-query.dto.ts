import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage?: number;
}
