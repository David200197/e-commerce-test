import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @MinLength(1)
  password: string;
  @IsUUID()
  @IsOptional()
  rolId?: string;
}
