import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 8)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly avatar: string;
}
