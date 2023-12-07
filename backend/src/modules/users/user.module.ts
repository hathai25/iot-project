import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { RFIDCardService } from "../RFID/RFIDCard.service";

@Module({
  providers: [UserService, PrismaService, RFIDCardService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
