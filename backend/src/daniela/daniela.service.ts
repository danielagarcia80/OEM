/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DanielaDto } from './daniela.dto';
import { Daniela } from '@prisma/client';

@Injectable()
export class DanielaService {
  constructor(private prisma: PrismaService) {}

  async createDaniela(dto: DanielaDto): Promise<Daniela> {
    const daniela = await this.prisma.daniela.create({
      data: {
        value: dto.value,
      },
    });

    if (daniela) {
      return daniela;
    }
    throw new HttpException(
      {
        message: 'Daniela Creation Failed',
        error: 'Daniela Creation Failed',
      },
      500,
    );
  }

  // Display the last 10 stored values retrieved from the GET API.

  async getValue(): Promise<Daniela[]> {
    return this.prisma.daniela.findMany({
      take: 10,
    });
  }
}
