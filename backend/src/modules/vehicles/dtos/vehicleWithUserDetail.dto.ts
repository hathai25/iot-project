import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { VehicleDto } from "./vehicle.dto";

export class VehicleWithUserDetailDto extends VehicleDto {
  @Expose()
  @ApiProperty()
  user: {
    name: string;
    avatar: string;
  }
}
