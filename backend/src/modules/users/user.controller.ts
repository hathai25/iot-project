import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserFilterDto } from "./dtos";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { JwtAdminGuard } from "../admin/guards";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAdminGuard)
  @Get(":id")
  @ApiOkResponse({ description: "Get user by id", type: UserEntity })
  async findOne(@Param("id") id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAdminGuard)
  @Post()
  @ApiCreatedResponse({ description: "Create user", type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAdminGuard)
  @Patch(":id")
  @ApiOkResponse({ description: "Update user", type: UserEntity })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, data: updateUserDto });
  }

  @UseGuards(JwtAdminGuard)
  @Delete(":id")
  @ApiOkResponse({ description: "Delete user", type: UserEntity })
  async remove(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAdminGuard)
  @Get("/list/all")
  @ApiOkResponse({ description: "Get all users" })
  async findAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAdminGuard)
  @Post("/list")
  @ApiOkResponse({ description: "Get users with filter" })
  async getUsers(@Body() filter: UserFilterDto) {
    return this.userService.getUsers(filter);
  }
}
