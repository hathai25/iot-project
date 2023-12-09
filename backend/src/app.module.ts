import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule, UserModule, VehicleModule, AdminModule } from "./modules";
import { HistoryModule } from "./modules/history/history.module";
import { MqttService } from "./mqtt.service";

@Module({
  imports: [UserModule, AuthModule, VehicleModule, AdminModule, HistoryModule],
  controllers: [],
  providers: [PrismaService, MqttService],
})
export class AppModule {}
