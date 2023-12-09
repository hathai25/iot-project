import { Expose } from "class-transformer";
import { RFIDCardDto } from "./RFIDCard.dto";
import { ApiProperty } from "@nestjs/swagger";
import { VehicleType } from "@prisma/client";

export class RFIDCardFullDto extends RFIDCardDto {
  @Expose()
  @ApiProperty()
  user: {
    name: string;
  };

  @Expose()
  @ApiProperty()
  Vehicle: {
    plate: string;
    type: VehicleType
  };
}
