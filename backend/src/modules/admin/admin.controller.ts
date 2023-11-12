import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ISuccessRespone } from "src/common/respone/interface";
import { AdminDto, CreateAdminDto, LoginAdminDto } from "./dtos";
import { dataToRespone } from "src/common/respone/util";
import { JwtAdminGuard } from "./guards";
import { AdminEntity } from "./admin.entity";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOkResponse({ description: "Login Admin", type: AdminEntity })
  @Post("login")
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<any> {
    return this.adminService.loginAdmin(loginAdminDto);
  }

  @ApiOkResponse({ description: "Create Admin", type: AdminEntity })
  @UseGuards(JwtAdminGuard)
  @Post("create")
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto
  ): Promise<ISuccessRespone<AdminDto>> {
    const newAdmin = await this.adminService.createAdmin(createAdminDto);

    return dataToRespone(AdminDto)(newAdmin);
  }
}
