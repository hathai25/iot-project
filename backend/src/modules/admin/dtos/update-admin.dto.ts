import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;
}
