import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HistoryService } from "./history.service";
import { JwtAdminGuard } from "../admin/guards";
import { arrDataToRespone } from "src/common/respone/util";
import { HistoryDto } from "./dtos/history.dto";
import { HistoryType } from "@prisma/client";
import { HistoryEntity } from "./history.entity";
import { CreateHistoryDto } from "./dtos/create-history.dto";

@ApiTags("history")
@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(JwtAdminGuard)
  @Get(":id")
  @ApiOkResponse({ description: "Get list history by vehicle id" })
  async getListHistoryByVehicleId(@Param("id") vehicleId: string) {
    const listHistory = await this.historyService.getListHistoryByVehicleId(
      vehicleId
    );

    return arrDataToRespone(HistoryDto)(listHistory, listHistory.length);
  }

  @UseGuards(JwtAdminGuard)
  @Get("type/:type")
  @ApiOkResponse({ description: "Get list history by vehicle id" })
  async getListHistoryByType(@Param("type") type: HistoryType) {
    const listHistory = await this.historyService.getListHistoryByType(type);

    return arrDataToRespone(HistoryDto)(listHistory, listHistory.length);
  }

  @UseGuards(JwtAdminGuard)
  @Post("create")
  @ApiCreatedResponse({ description: "Create history", type: HistoryEntity })
  async create(@Body() createHistoryDto: CreateHistoryDto) {
    const history = await this.historyService.createHistory(createHistoryDto);

    return history;
  }

  @UseGuards(JwtAdminGuard)
  @Delete("delete/:id")
  @ApiOkResponse({ description: "Delete history by Id" })
  async delete(@Param("id") id: string) {
    const history = await this.historyService.deleteHistory(id);

    return history;
  }
}
