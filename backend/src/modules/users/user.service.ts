import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UpdateUserDto, CreateUserDto, UserFilterDto, UserDto } from "./dtos";
import { brcyptHelper } from "src/utils/bcrypt";
import { UserEntity } from "./user.entity";
import { ISuccessListRespone } from "src/common/respone/interface";
import { arrDataToRespone } from "src/common/respone/util";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (
      !user ||
      !(await brcyptHelper.comparePassword(password, user.password))
    ) {
      throw new ForbiddenException("email or password not valid");
    }

    return user;
  }

  async getUser(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const users = await this.prisma.user.findMany({
      where: { email: data.email },
    });
    if (users.length) {
      throw new ForbiddenException("email already exists");
    }
    data.password = await brcyptHelper.hash(data.password);
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    id: string;
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { id, data } = params;
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async countUsers(filter: UserFilterDto): Promise<number> {
    return this.prisma.user.count({
      where: {
        ...filter.options,
      },
    });
  }

  async getAllUsers(): Promise<ISuccessListRespone<UserDto>> {
    const users = await this.prisma.user.findMany();
    return arrDataToRespone(UserDto)(users, users.length);
  }

  async getUsers(
    filter: UserFilterDto
  ): Promise<ISuccessListRespone<UserEntity>> {
    const total = await this.countUsers(filter);
    const users = await this.prisma.user.findMany({
      where: {
        email: {
          contains: filter.email,
        },
      },
      skip: filter.skip,
      take: filter.pagesize,
    });
    return arrDataToRespone(UserEntity)(users, total);
  }
}
