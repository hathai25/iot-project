import { ApiProperty } from "@nestjs/swagger";
import { HistoryType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class FilterHistoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vehicleID?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(HistoryType)
  type?: HistoryType;
}
