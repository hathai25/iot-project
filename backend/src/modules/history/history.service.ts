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

  async getLastHistoryOfVehicle(plate: string): Promise<HistoryDto> {
    const history = await this.prisma.history.findFirst({
      where: {
        plate,
      },
      orderBy: {
        time: "desc",
      },
    });

    return history;
  }

  async getLastHistoryOfRFIDCard(rfid: string): Promise<HistoryDto> {
    const vehicles = await this.vehicleService.getVehiclesByRFID(rfid);
    if (vehicles.length === 0) {
      const history = await this.prisma.history.findFirst({
        where: {
          vehicleID: rfid,
        },
        orderBy: {
          time: "desc",
        },
      });
      return history;
    }
    const history = await this.prisma.history.findFirst({
      where: {
        plate: {
          in: vehicles.map((vehicle) => vehicle.plate),
        },
      },
      orderBy: {
        time: "desc",
      },
    });
    return history;
  }
}
