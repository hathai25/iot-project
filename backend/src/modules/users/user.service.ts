import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {
  UpdateUserDto,
  CreateUserDto,
  UserFilterDto,
  ListUserDto,
} from "./dtos";
import { brcyptHelper } from "src/utils/bcrypt";
import { UserEntity } from "./user.entity";
import { ISuccessListRespone } from "src/common/respone/interface";
import { arrDataToRespone } from "src/common/respone/util";
import { RFIDCardService } from "../RFID/RFIDCard.service";
import { RFIDCardType } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly rfidCardService: RFIDCardService
  ) {}

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

    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      avatar: data.avatar,
    };

    const user = await this.prisma.user.create({
      data: userData,
    });

    this.rfidCardService.createRFIDCard({
      type: RFIDCardType.user,
      userID: user.id,
      balance: data.balance,
    });

    return user;
  }

  async updateUser(params: {
    id: string;
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { id, data } = params;
    return this.prisma.user.update({
      data: {
        name: data.name,
        avatar: data.avatar,
        rfidCard: {
          update: {
            balance: data.balance,
          },
        },
      },
      where: { id },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    await this.prisma.rFIDCard.delete({
      where: { userID: id },
    });

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

  async getAllUsers(): Promise<ISuccessListRespone<ListUserDto>> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        rfidCard: true,
      },
    });

    return arrDataToRespone(ListUserDto)(users, users.length);
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
