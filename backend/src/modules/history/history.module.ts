import { Module } from "@nestjs/common";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { PrismaService } from "src/prisma.service";
import { VehicleService } from "../vehicles/vehicle.service";

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, PrismaService, VehicleService],
})
export class HistoryModule {}
