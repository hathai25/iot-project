import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule, UserModule, VehicleModule, AdminModule } from "./modules";

@Module({
  imports: [UserModule, AuthModule, VehicleModule, AdminModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
