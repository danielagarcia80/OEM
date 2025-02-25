import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { DanielaService } from './daniela.service';
import { DanielaDto } from './daniela.dto';
import { Daniela } from '@prisma/client';

@Controller('daniela')
export class DanielaController {
  constructor(private danielaService: DanielaService) {}

  @Post()
  async create(@Body() dto: DanielaDto): Promise<Daniela> {
    const res = await this.danielaService.createDaniela(dto);
    if (!res) {
      throw new HttpException(
        {
          message: 'Daniela Creation Failed',
          error: 'Daniela Creation Failed',
        },
        500,
      );
    }
    return res;
  }
  catch(error) {
    if (error instanceof HttpException) {
      throw new HttpException(error.message, error.getStatus());
    }
    throw new HttpException('Internal Server Error', 500);
  }

  @Get()
  async getValue(): Promise<Daniela[]> {
    try {
      return await this.danielaService.getValue();
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
