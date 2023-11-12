import { ApiProperty } from "@nestjs/swagger";
import { History, HistoryType } from "@prisma/client";

export class HistoryEntity implements History {
  @ApiProperty()
  id: string;

  @ApiProperty()
  vehicleID: string;

  @ApiProperty()
  type: HistoryType;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  plate: string;
}
