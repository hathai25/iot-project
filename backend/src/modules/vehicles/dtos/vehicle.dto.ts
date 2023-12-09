import { ApiProperty } from "@nestjs/swagger";
import { VehicleStatus, VehicleType } from "@prisma/client";
import { Expose } from "class-transformer";

export class VehicleDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userID: string;

  @Expose()
  @ApiProperty()
  rFIDCardId: string;

  @Expose()
  @ApiProperty()
  plate: string;

  @Expose()
  @ApiProperty()
  type: VehicleType;

  @Expose()
  @ApiProperty()
  status: VehicleStatus;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  image: string;
}
