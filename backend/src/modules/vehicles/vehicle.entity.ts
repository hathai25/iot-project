import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Vehicle } from "@prisma/client";

export class VehicleEntity implements Vehicle {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userID: string;

  @ApiProperty()
  plate: string;

  @ApiProperty()
  type: $Enums.VehicleType;

  @ApiProperty()
  status: $Enums.VehicleStatus;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}
