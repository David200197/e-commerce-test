import { IsInt, IsNumber, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsInt()
  stockQuantity: number;
  @IsString()
  category: string;
  @IsUUID(4, { each: true })
  tagIds: string[];
  @IsString()
  additionalInformation: string;
  @IsString()
  assessment: string;
  @IsString()
  description: string;
  @IsUrl({}, { each: true })
  urlAssociatedImages: string[];
}
