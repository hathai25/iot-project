import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {
  CreateRFIDCardDto,
  ParkDTO,
  RFIDCardDto,
  UpdateRFIDCardDto,
} from "./dtos";
import { RFIDCardType } from "@prisma/client";
import { VehicleService } from "../vehicles/vehicle.service";
import { HistoryService } from "../history/history.service";
import { MqttService } from "src/mqtt.service";

@Injectable()
export class RFIDCardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vehicleService: VehicleService,
    private readonly historyService: HistoryService,
    private readonly mqttServivce: MqttService
  ) {}

  async getRFIDCardByUserID(userId: string): Promise<Array<RFIDCardDto>> {
    const RFIDCard = await this.prisma.rFIDCard.findMany({
      where: {
        userID: userId,
      },
    });
    return RFIDCard;
  }

  async getRFIDCard(id: string): Promise<RFIDCardDto> {
    const RFIDCard = await this.prisma.rFIDCard.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            name: true,
            Vehicle: true,
          },
        },
        Vehicle: true,
      },
    });

    console.log({ RFIDCard });

    return RFIDCard;
  }

  async getAll(): Promise<Array<RFIDCardDto>> {
    const RFIDCards = await this.prisma.rFIDCard.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        Vehicle: {
          select: {
            plate: true,
            type: true,
          },
        },
      },
    });
    return RFIDCards;
  }

  async createRFIDCard(
    createRFIDCardDto: CreateRFIDCardDto
  ): Promise<RFIDCardDto> {
    const RFIDCard = await this.prisma.rFIDCard.create({
      data: createRFIDCardDto,
    });

    return RFIDCard;
  }

  async updateRFIDCard(
    id: string,
    data: UpdateRFIDCardDto
  ): Promise<RFIDCardDto> {
    const RFIDCard = this.getRFIDCard(id);

    if (!RFIDCard) {
      throw new NotFoundException("Not found RFID card of ID: ", id);
    }

    if (!data) {
      throw new BadRequestException();
    }

    const updatedRFID = await this.prisma.rFIDCard.update({
      data,
      where: {
        id: id,
      },
    });

    return updatedRFID;
  }

  async GetOutUserCard(id: string): Promise<RFIDCardDto> {
    const RFIDCard = await this.getRFIDCard(id);

    if (!RFIDCard) {
      throw new NotFoundException("Not found RFID card of ID: ", id);
    }

    if (RFIDCard.type == RFIDCardType.user) {
      const updatedRFID = await this.prisma.rFIDCard.update({
        data: {
          balance: RFIDCard.balance - 3000,
        },
        where: {
          id: id,
        },
      });
      return updatedRFID;
    } else if (RFIDCard.type == RFIDCardType.visitor) {
      // ...
    }
  }

  async deleteRFIDCard(id: string): Promise<RFIDCardDto> {
    const RFIDCard = this.getRFIDCard(id);

    if (!RFIDCard) {
      throw new NotFoundException("Not found RFID card of ID: ", id);
    }
    const deletedRFID = await this.prisma.rFIDCard.delete({
      where: {
        id: id,
      },
    });

    return deletedRFID;
  }

  async parkWithRFIDCard(data: ParkDTO): Promise<boolean> {
    const { id, vehicleID, image } = data;
    const RFIDCard = await this.getRFIDCard(id);

    if (!RFIDCard) {
      throw new NotFoundException("Not found RFID card of ID: ", id);
    }
    if (RFIDCard.type === RFIDCardType.visitor) {
      const history = await this.historyService.listHistory({
        vehicleID: id,
      });

      if (history.length % 2 === 0) {
        if (id === vehicleID) {
          await this.historyService.createHistory({
            vehicleID: id,
            type: "in",
            image: image,
            plate: id,
          });
        } else {
          await this.historyService.createHistory({
            vehicleID: id,
            type: "in",
            image: image,
            plate: vehicleID,
          });
        }
      } else {
        if (id === vehicleID) {
          await this.historyService.createHistory({
            vehicleID: id,
            type: "out",
            image: image,
            plate: id,
          });
        } else {
          await this.historyService.createHistory({
            vehicleID: id,
            type: "out",
            image: image,
            plate: vehicleID,
          });
        }
      }

      await this.mqttServivce.publish("barrier", "1");
      return true;
    }

    if (RFIDCard.balance < 3000) {
      throw new BadRequestException("Not enough money");
    }
    const vehicle = await this.vehicleService.getVehicle(vehicleID);
    if (!vehicle) {
      throw new NotFoundException("Not found vehicle of ID: ", vehicleID);
    }

    const history = await this.historyService.listHistory({
      vehicleID: vehicleID,
    });

    if (history.length % 2 === 0) {
      if (vehicle.status === "away") {
        await this.historyService.createHistory({
          vehicleID: vehicleID,
          type: "in",
          image: image,
          plate: vehicle.plate,
        });

        await this.prisma.vehicle.update({
          data: {
            status: "parking",
          },
          where: {
            id: vehicleID,
          },
        });

        if (vehicle.type === "car") {
          await this.prisma.rFIDCard.update({
            data: {
              balance: RFIDCard.balance - 10000,
            },
            where: {
              id: id,
            },
          });
        } else {
          await this.prisma.rFIDCard.update({
            data: {
              balance: RFIDCard.balance - 3000,
            },
            where: {
              id: id,
            },
          });
        }
      } else {
        throw new BadRequestException("Your car is parked");
      }
    } else {
      if (vehicle.status === "parking") {
        await this.historyService.createHistory({
          vehicleID: vehicleID,
          type: "out",
          image: image,
          plate: vehicle.plate,
        });

        await this.prisma.vehicle.update({
          data: {
            status: "away",
          },
          where: {
            id: vehicleID,
          },
        });
      } else {
        throw new BadRequestException("Your car is not parked");
      }
    }

    this.mqttServivce.publish("barrier", "1");

    return true;
  }
}
