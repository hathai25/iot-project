import { ApiProperty } from "@nestjs/swagger";
import { HistoryType } from "@prisma/client";
import { Expose } from "class-transformer";

export class HistoryDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  vehicleID: string;

  @Expose()
  @ApiProperty()
  type: HistoryType;

  @Expose()
  @ApiProperty()
  time: Date;

  @Expose()
  @ApiProperty()
  image: string;

  @Expose()
  @ApiProperty()
  plate: string;
}
