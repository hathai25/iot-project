import { ApiProperty } from "@nestjs/swagger";
import { VehicleStatus, VehicleType } from "@prisma/client";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  userID: string;

  @Length(6, 12) // case: xe quân sự (7 kí tự), xe ngoại giao (12 kí tự)
  @IsNotEmpty()
  @ApiProperty()
  plate: string;

  @IsNotEmpty()
  @ApiProperty()
  type: VehicleType;

  @IsOptional()
  @ApiProperty()
  status: VehicleStatus;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  image?: string;
}
