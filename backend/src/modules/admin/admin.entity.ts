import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "@prisma/client";

export class AdminEntity implements Admin {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;
}
