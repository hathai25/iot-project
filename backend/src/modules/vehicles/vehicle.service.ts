import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { VehicleFilterDto } from "./dtos/vehicle-filter.dto";
import { ISuccessListRespone } from "src/common/respone/interface";
import {
  CreateVehicleDto,
  UpdateParkingStatusVehicleDto,
  UpdateVehicleDto,
  VehicleDto,
} from "./dtos";
import { arrDataToRespone } from "src/common/respone/util";
import { VehicleEntity } from "./vehicle.entity";

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicle(id: string): Promise<VehicleDto | null> {
    const result = await this.prisma.vehicle.findUnique({
      where: { id: id },
    });
    return result;
  }

  async getVehicleByUserID(
    userID: string
  ): Promise<ISuccessListRespone<VehicleDto> | null> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { userID: userID },
    });

    const result = arrDataToRespone(VehicleDto)(vehicles, vehicles.length);
    return result;
  }

  async getVehicleByPlate(plate: string): Promise<VehicleDto | null> {
    return await this.prisma.vehicle.findUnique({
      where: { plate },
    });
  }

  async countVehicles(filter: VehicleFilterDto): Promise<number> {
    return this.prisma.vehicle.count({
      where: {
        ...filter,
      },
    });
  }

  async getVehicles(
    filter: VehicleFilterDto
  ): Promise<ISuccessListRespone<VehicleDto> | null> {
    const total = await this.countVehicles(filter);
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        plate: {
          contains: filter.plate,
        },
      },
      skip: filter.skip,
      take: filter.pagesize,
    });
    const result = arrDataToRespone(VehicleDto)(vehicles, total);
    return result;
  }

  async getAllVehicles(): Promise<ISuccessListRespone<VehicleDto> | null> {
    const vehicles = await this.prisma.vehicle.findMany();
    return arrDataToRespone(VehicleDto)(vehicles, vehicles.length);
  }

  async createVehicle(data: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { plate: data.plate },
    });

    if (vehicle) {
      throw new ForbiddenException("Plate already exists");
    }

    const result = await this.prisma.vehicle.create({
      data,
    });
    return result;
  }

  async updateVehicle(
    id: string,
    data: UpdateVehicleDto
  ): Promise<VehicleEntity> {
    const vehicle = await this.getVehicle(id);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    const result = await this.prisma.vehicle.update({
      data,
      where: { id },
    });

    return result;
  }

  async updateParkingStatusVehicle(
    id: string,
    data: UpdateParkingStatusVehicleDto
  ): Promise<VehicleEntity> {
    const vehicle = await this.getVehicle(id);

    if (data.plate !== vehicle.plate) {
      throw new BadRequestException(`Licisen plate ${data.plate} mismatch!`);
    }

    return await this.prisma.vehicle.update({
      data,
      where: { id },
    });
  }

  async deleteVehicle(id: string): Promise<VehicleEntity> {
    const vehicle = await this.getVehicle(id);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    return await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}