import { ApiProperty } from "@nestjs/swagger";
import { HistoryType } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateHistoryDto {
  @IsNotEmpty()
  @ApiProperty()
  vehicleID: string;

  @IsNotEmpty()
  @ApiProperty()
  type: HistoryType;

  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @ApiProperty()
  plate: string;
}
