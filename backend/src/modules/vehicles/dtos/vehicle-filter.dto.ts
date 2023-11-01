import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { BaseFilterDto } from "src/common/dtos";

export class VehicleFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly plate?: string;
}
