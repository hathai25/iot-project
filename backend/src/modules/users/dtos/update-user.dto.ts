import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  balance: number;
}
