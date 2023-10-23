import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GetMeDto {
  @Expose()
  @ApiProperty()
  userId: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  avatar: string;
}
