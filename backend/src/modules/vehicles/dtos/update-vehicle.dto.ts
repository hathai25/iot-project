import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsOptional, Length } from "class-validator";

export class UpdateVehicleDto {
  @ApiProperty()
  @IsOptional()
  userID: string;

  @Length(6, 12) // case: xe quân sự (7 kí tự), xe ngoại giao (12 kí tự)
  @ApiProperty()
  @IsOptional()
  plate: string;

  @ApiProperty()
  @IsOptional()
  type: $Enums.VehicleType;

  @ApiProperty()
  @IsOptional()
  status: $Enums.VehicleStatus;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  image: string;
}
