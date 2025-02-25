import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TestModule } from './test/test.module';
import { DanielaModule } from './daniela/daniela.module';

@Module({
  imports: [TestModule, DanielaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
