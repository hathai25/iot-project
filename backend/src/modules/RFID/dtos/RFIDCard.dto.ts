import { ApiProperty } from "@nestjs/swagger";
import { RFIDCardType } from "@prisma/client";
import { Expose } from "class-transformer";

export class RFIDCardDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  type: RFIDCardType;

  @Expose()
  @ApiProperty()
  userID: string;

  @Expose()
  @ApiProperty()
  balance: number;
}
