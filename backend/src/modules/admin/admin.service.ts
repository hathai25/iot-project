import { PrismaService } from "./../../prisma.service";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { LoginAdminDto } from "./dtos/login-admin.dto";
import { brcyptHelper } from "src/utils/bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AdminEntity } from "./admin.entity";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  // api login admin
  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginAdminDto.email },
    });
    if (
      !admin ||
      !brcyptHelper.comparePassword(loginAdminDto.password, admin.password)
    ) {
      throw new ForbiddenException("email or password is invalid");
    }

    return {
      token: await this.jwtService.signAsync({
        email: admin.email,
        sub: admin.id,
        name: admin.name,
      }),
    };
  }

  //crud admin:
  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const admin = await this.prisma.admin.findMany({
      where: { email: createAdminDto.email },
    });
    if (admin.length !== 0) {
      throw new BadRequestException("email is exist in system");
    }
    const data = new AdminEntity();
    data.email = createAdminDto.email;
    data.password = createAdminDto.password;
    data.name = createAdminDto.name;
    data.avatar = createAdminDto.avatar;

    return await this.prisma.admin.create({
      data,
    });
  }
}
