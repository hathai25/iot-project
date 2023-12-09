import { ApiProperty } from "@nestjs/swagger";
import { RFIDCardType } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateRFIDCardDto {
  @ApiProperty()
  @IsNotEmpty()
  type: RFIDCardType;

  @ApiProperty()
  @IsNotEmpty()
  userID: string;

  @ApiProperty()
  balance: number;
}
