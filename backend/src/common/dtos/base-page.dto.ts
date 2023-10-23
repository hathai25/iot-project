import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export class BaseFilterDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly pagesize?: number;

  @IsOptional()
  @IsEnum(SortType)
  @ApiPropertyOptional()
  readonly sort?: SortType;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly sortBy?: string;

  constructor(page = 1, pagesize = 10, sort = SortType.ASC, sortBy = "id") {
    this.page = page;
    this.pagesize = pagesize;
    this.sort = sort;
    this.sortBy = sortBy;
  }

  get skip() {
    return (this.page - 1) * this.pagesize;
  }
}
