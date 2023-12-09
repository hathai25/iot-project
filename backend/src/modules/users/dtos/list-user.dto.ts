import { Expose } from "class-transformer";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { RFIDCardType } from "@prisma/client";

export class ListUserDto extends UserDto {
  @Expose()
  @ApiProperty()
  rfidCard: {
    id: string;
    balance: number;
    userID: string;
    type: RFIDCardType;
  };
}
