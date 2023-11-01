import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule, UserModule } from "./modules";
import { VehicleModule } from "./modules/vehicles/vehicle.module";

@Module({
  imports: [UserModule, AuthModule, VehicleModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
