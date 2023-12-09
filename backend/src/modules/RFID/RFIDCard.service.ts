import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateRFIDCardDto, RFIDCardDto, UpdateRFIDCardDto } from "./dtos";
import { RFIDCardType } from "@prisma/client";

@Injectable()
export class RFIDCardService {
  constructor(private readonly prisma: PrismaService) {}

  async getRFIDCardByUserID(userId: string): Promise<Array<RFIDCardDto>> {
    const RFIDCard = await this.prisma.rFIDCard.findMany({
      where: {
        userID: userId,
      },
    });
    return RFIDCard;
  }

  async getRFIDCard(id: string): Promise<RFIDCardDto> {
    const RFIDCard = await this.prisma.rFIDCard.findUniqueOrThrow({
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
      },
    });

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
}
