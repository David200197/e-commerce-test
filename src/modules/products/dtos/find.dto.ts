import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class FindDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
  @IsInt()
  @Min(0)
  @IsOptional()
  stockQuantity?: number;
  @IsString()
  @IsOptional()
  category?: string;
  @IsUUID(4, { each: true })
  @IsOptional()
  tagIds?: string[];
  @IsString()
  @IsOptional()
  additionalInformation?: string;
  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  assessment?: number;
  @IsString()
  @IsOptional()
  description?: string;
  @IsUrl()
  @IsOptional()
  associatedImage?: string;
}
