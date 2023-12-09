import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule, UserModule, VehicleModule, AdminModule } from "./modules";
import { HistoryModule } from "./modules/history/history.module";
import { RFIDCardModule } from "./modules/RFID/RFIDCard.module";
import { MqttService } from "./mqtt.service";

@Module({
  imports: [
    UserModule,
    AuthModule,
    VehicleModule,
    AdminModule,
    HistoryModule,
    RFIDCardModule,
  ],
  controllers: [],
  providers: [PrismaService, MqttService],
})
export class AppModule {}
