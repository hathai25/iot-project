import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDto, GetMeDto, LoginDto } from "./dtos";
import { AuthService } from "./auth.service";
import { UserEntity } from "../users/user.entity";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ISuccessRespone } from "src/common/respone/interface";
import { dataToRespone } from "src/common/respone/util";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "Register user", type: UserEntity })
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserEntity | null> {
    const newUser = await this.authService.register(createUserDto);
    return newUser;
  }

  @Post("login")
  @ApiOkResponse({ description: "Login user", type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMeUser(@Req() req: any): Promise<ISuccessRespone<GetMeDto>> {
    return dataToRespone(GetMeDto)(req.user);
  }
}
