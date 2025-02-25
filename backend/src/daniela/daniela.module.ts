import { Module } from '@nestjs/common';
import { DanielaService } from './daniela.service';
import { DanielaController } from './daniela.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DanielaService, PrismaService],
  controllers: [DanielaController],
})
export class DanielaModule {}
