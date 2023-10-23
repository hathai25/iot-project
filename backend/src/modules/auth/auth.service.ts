import { Injectable } from "@nestjs/common";
import { UserEntity } from "../users/user.entity";
import { LoginDto, CreateUserDto } from "./dtos";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return {
      token: await this.jwtService.signAsync({
        name: user.name,
        email: user.email,
        sub: user.id,
        avatar: user.avatar,
      }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createUserDto);
  }
}
