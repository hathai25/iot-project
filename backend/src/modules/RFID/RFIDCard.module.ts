import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RFIDCardService } from "./RFIDCard.service";
import { RFIDCardController } from "./RFIDCard.controller";

@Module({
  controllers: [RFIDCardController],
  providers: [PrismaService, RFIDCardService],
  exports: [RFIDCardService],
})
export class RFIDCardModule {}
