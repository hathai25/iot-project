import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdminStrategy } from "./strategies/jwt-admin.strategy";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ADMIN_SECRET_KEY || "iot-server-admin",
      signOptions: { expiresIn: process.env.ADMIN_JWT_EXPIRES || "1h" },
    }),
  ],
  providers: [AdminService, JwtAdminStrategy, PrismaService],
  controllers: [AdminController],
})
export class AdminModule {}
