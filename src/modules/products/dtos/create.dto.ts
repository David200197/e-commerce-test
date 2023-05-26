import {
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;
  @IsNumber()
  @Min(0)
  price: number;
  @IsInt()
  @Min(0)
  stockQuantity: number;
  @IsString()
  category: string;
  @IsUUID(4, { each: true })
  tagIds: string[];
  @IsString()
  additionalInformation: string;
  @IsInt()
  @Min(0)
  @Max(10)
  assessment: number;
  @IsString()
  description: string;
  @IsUrl({}, { each: true })
  urlAssociatedImages: string[];
}
