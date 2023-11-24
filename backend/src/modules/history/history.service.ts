import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { VehicleService } from "../vehicles/vehicle.service";
import { FilterHistoryDto, CreateHistoryDto, HistoryDto } from "./dtos";

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vehicleService: VehicleService
  ) {}

  async listHistory(
    filterHistory: FilterHistoryDto
  ): Promise<Array<HistoryDto>> {
    const history = await this.prisma.history.findMany({
      where: {
        ...filterHistory,
      },
    });

    return history;
  }

  async createHistory(data: CreateHistoryDto): Promise<HistoryDto> {
    const history = await this.prisma.history.create({ data });

    return history;
  }

  async deleteHistory(id: string): Promise<HistoryDto> {
    const history = await this.prisma.history.delete({ where: { id } });

    return history;
  }
}
