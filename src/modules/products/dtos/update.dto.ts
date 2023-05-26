import { PartialType } from '@nestjs/mapped-types';
import { CreateDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateDto extends PartialType(CreateDto) {
  @IsOptional()
  name?: string;
  @IsOptional()
  price?: number;
  @IsOptional()
  stockQuantity?: number;
  @IsOptional()
  category?: string;
  @IsOptional()
  tagIds?: string[];
  @IsOptional()
  additionalInformation?: string;
  @IsOptional()
  assessment?: number;
  @IsOptional()
  description?: string;
  @IsOptional()
  urlAssociatedImages?: string[];
}
