import { Module } from "@nestjs/common";
import { VehicleController } from "./vehicle.controller";
import { VehicleService } from "./vehicle.service";
import { PrismaService } from "src/prisma.service";
import { UserService } from "../users/user.service";

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService],
  exports: [VehicleService],
})
export class VehicleModule {}
