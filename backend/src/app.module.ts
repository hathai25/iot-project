import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthModule, UserModule } from "./modules";

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
