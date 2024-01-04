import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RFIDCardService } from "./RFIDCard.service";
import { RFIDCardController } from "./RFIDCard.controller";
import { MqttService } from "src/mqtt.service";
import { VehicleModule } from "../vehicles/vehicle.module";
import { HistoryModule } from "../history/history.module";

@Module({
  imports: [VehicleModule, HistoryModule],
  controllers: [RFIDCardController],
  providers: [PrismaService, RFIDCardService, MqttService],
  exports: [RFIDCardService],
})
export class RFIDCardModule {}
