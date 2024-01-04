import { Module } from "@nestjs/common";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { PrismaService } from "src/prisma.service";
import { VehicleService } from "../vehicles/vehicle.service";
import { MqttService } from "src/mqtt.service";

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, PrismaService, VehicleService, MqttService],
  exports: [HistoryService],
})
export class HistoryModule {}
