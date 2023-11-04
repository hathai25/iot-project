import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Smart Vehicle Parking System")
    .setDescription("API description for Smart Vehicle Parking System")
    .setVersion("1.0")
    .addTag("Parking System")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: ["http://localhost:5173"],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  console.log(`swagger: http://localhost:3000/api`);
}
bootstrap();
