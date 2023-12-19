import { Module } from "@nestjs/common";
import { VehicleController } from "./vehicle.controller";
import { VehicleService } from "./vehicle.service";
import { PrismaService } from "src/prisma.service";
import { MqttService } from "src/mqtt.service";

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService, MqttService],
  exports: [VehicleService],
})
export class VehicleModule {}
