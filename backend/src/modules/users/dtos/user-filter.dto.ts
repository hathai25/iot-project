import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { BaseFilterDto } from "src/common/dtos";

export class UserFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly email?: string;

  get options() {
    const options = {};
    return options;
  }
}
