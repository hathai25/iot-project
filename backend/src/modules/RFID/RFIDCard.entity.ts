import { ApiProperty } from "@nestjs/swagger";
import { RFIDCardType, RFIDCard } from "@prisma/client";

export class RFIDCardEntity implements RFIDCard {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: RFIDCardType;

  @ApiProperty()
  userID: string;

  @ApiProperty()
  balance: number;
}
