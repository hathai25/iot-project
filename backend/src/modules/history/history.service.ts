import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { HistoryDto } from "./dtos/history.dto";
import { VehicleService } from "../vehicles/vehicle.service";
import { HistoryType, VehicleStatus } from "@prisma/client";
import { CreateHistoryDto } from "./dtos/create-history.dto";

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vehicleService: VehicleService
  ) {}

  async getListHistoryByVehicleId(
    vehicleID: string
  ): Promise<Array<HistoryDto>> {
    await this.vehicleService.getVehicle(vehicleID);

    const history = await this.prisma.history.findMany({
      where: { vehicleID },
      include: {
        vehicle: {
          select: {
            status: true,
          },
        },
      },
    });

    return history;
  }

  async getListHistoryByType(type: HistoryType): Promise<Array<HistoryDto>> {
    const history = await this.prisma.history.findMany({
      where: { type },
      include: {
        vehicle: {
          select: {
            status: true,
          },
        },
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
