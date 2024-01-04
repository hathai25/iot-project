import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAdminGuard } from "../admin/guards";
import { RFIDCardService } from "./RFIDCard.service";
import {
  ParkDTO,
  RFIDCardDto,
  RFIDCardFullDto,
  UpdateRFIDCardDto,
} from "./dtos";
import { arrDataToRespone } from "src/common/respone/util";

@ApiTags("RFIDCard")
@Controller("RFIDCard")
export class RFIDCardController {
  constructor(private readonly rfidCardService: RFIDCardService) {}

  @UseGuards(JwtAdminGuard)
  @Get(":id")
  @ApiOkResponse()
  async findOne(@Param("id") id: string) {
    return this.rfidCardService.getRFIDCard(id);
  }

  @UseGuards(JwtAdminGuard)
  @Get("user/:userId")
  @ApiOkResponse()
  async findByUserId(@Param(":userId") userId: string) {
    return this.rfidCardService.getRFIDCardByUserID(userId);
  }

  @UseGuards(JwtAdminGuard)
  @Get("list/all")
  @ApiOkResponse()
  async getAll() {
    const rfidCards = await this.rfidCardService.getAll();
    return arrDataToRespone(RFIDCardFullDto)(rfidCards, rfidCards.length);
  }

  @UseGuards(JwtAdminGuard)
  @Put("update/:id")
  @ApiOkResponse()
  async updateRFIDCard(
    @Param("id") id: string,
    @Body() data: UpdateRFIDCardDto
  ) {
    return this.rfidCardService.updateRFIDCard(id, data);
  }

  @UseGuards(JwtAdminGuard)
  @Put("update/:id")
  @ApiOkResponse()
  async deleteRFID(@Param("id") id: string) {
    return this.rfidCardService.deleteRFIDCard(id);
  }

  @UseGuards(JwtAdminGuard)
  @Post("park")
  @ApiOkResponse()
  async parkWithRFIDCard(@Body() data: ParkDTO) {
    return this.rfidCardService.parkWithRFIDCard(data);
  }
}
