import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'feedbacks',
      protoPath: join(__dirname, '../src/feedbacks/feedbacks.proto'),
      url: configService.get("GRPC_CONNECTION_URL")
    },
  });
  app.startAllMicroservices();
}
bootstrap();
