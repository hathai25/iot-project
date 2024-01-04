import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { RFIDCardModule } from "../RFID/RFIDCard.module";

@Module({
  imports: [RFIDCardModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
