import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Vehicle } from "@prisma/client";
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
  plate: string;

  @Expose()
  @ApiProperty()
  type: $Enums.VehicleType;

  @Expose()
  @ApiProperty()
  status: $Enums.VehicleStatus;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty()
  image: string;
}
