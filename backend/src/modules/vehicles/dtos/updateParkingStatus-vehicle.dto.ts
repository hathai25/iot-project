import { ApiProperty } from "@nestjs/swagger";
import { VehicleStatus } from "@prisma/client";
import { IsNotEmpty, Length } from "class-validator";

export class UpdateParkingStatusVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  userID: string;

  @Length(6, 12) // case: xe quân sự (7 kí tự), xe ngoại giao (12 kí tự)
  @IsNotEmpty()
  @ApiProperty()
  plate: string;

  @IsNotEmpty()
  @ApiProperty()
  status: VehicleStatus;

  @ApiProperty()
  image: string;
}
