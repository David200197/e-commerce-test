import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;
}
