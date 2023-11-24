import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HistoryService } from "./history.service";
import { JwtAdminGuard } from "../admin/guards";
import { arrDataToRespone } from "src/common/respone/util";
import { HistoryDto, CreateHistoryDto, FilterHistoryDto } from "./dtos";
import { HistoryEntity } from "./history.entity";

@ApiTags("history")
@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(JwtAdminGuard)
  @Get("list")
  @ApiOkResponse({ description: "Get list history by vehicle id" })
  async getHistoryList(@Query() filterHistory: FilterHistoryDto) {
    const listHistory = await this.historyService.listHistory(filterHistory);

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
