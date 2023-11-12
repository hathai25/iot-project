import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { VehicleFilterDto } from "./dtos/vehicle-filter.dto";
import {
  CreateVehicleDto,
  UpdateParkingStatusVehicleDto,
  UpdateVehicleDto,
  VehicleDto,
  VehicleWithUserDetailDto,
} from "./dtos";
import { VehicleEntity } from "./vehicle.entity";
import { VehicleStatus } from "@prisma/client";

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicle(id: string): Promise<VehicleWithUserDetailDto> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle id: ${id} not found`);
    }

    return vehicle;
  }

  async getVehicleByUserID(
    userID: string
  ): Promise<Array<VehicleWithUserDetailDto>> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { userID },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (vehicles.length === 0) {
      throw new NotFoundException(`Vehicles of userID: ${userID} not found`);
    }

    return vehicles;
  }

  async getVehicleByPlate(
    plate: string
  ): Promise<Array<VehicleWithUserDetailDto> | null> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        plate: {
          contains: plate,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (vehicles.length === 0) {
      throw new NotFoundException(`Vehicle license plate: ${plate} not found`);
    }

    return vehicles;
  }

  async countVehicles(filter: VehicleFilterDto): Promise<number> {
    return this.prisma.vehicle.count({
      where: {
        ...filter,
      },
    });
  }

  async getVehicles(filter: VehicleFilterDto): Promise<Array<VehicleDto>> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        plate: {
          contains: filter.plate,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      skip: filter.skip,
      take: filter.pagesize,
    });

    return vehicles;
  }

  async getAllVehicles(): Promise<Array<VehicleWithUserDetailDto>> {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });
    return vehicles;
  }

  async createVehicle(data: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { plate: data.plate },
    });

    if (vehicle) {
      throw new ForbiddenException(
        `License plate: ${data.plate} already exists`
      );
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
      throw new NotFoundException(`Vehicle id: ${id} not found`);
    }

    const result: VehicleEntity = await this.prisma.vehicle.update({
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

    if (
      vehicle.status === VehicleStatus.away &&
      data.status === VehicleStatus.away
    ) {
      throw new BadRequestException("Your car is not parked");
    } else if (
      vehicle.status === VehicleStatus.parking &&
      data.status === VehicleStatus.parking
    ) {
      throw new BadRequestException("Your car is parked");
    }

    const result: VehicleEntity = await this.prisma.vehicle.update({
      data,
      where: { id },
    });

    return result;
  }

  async deleteVehicle(id: string): Promise<VehicleEntity> {
    const vehicle = await this.getVehicle(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle id: ${id} not found`);
    }

    const result: VehicleEntity = await this.prisma.vehicle.delete({
      where: { id },
    });

    return result;
  }
}
