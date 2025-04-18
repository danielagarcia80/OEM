import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { TestService } from './test.service';
import { TestFunctionDto, TestFunctionRes } from './test.dto';
import { Public } from 'src/auth/jwt.guard';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Public()
  @Post()
  async createTest(@Body() dto: TestFunctionDto): Promise<TestFunctionRes> {
    try {
      const res = await this.testService.createTest(dto);
      if (!res) {
        throw new HttpException(
          {
            message: 'Test Creation Failed',
            error: 'Test Creation Failed',
          },
          500,
        );
      }
      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Public()
  @Get()
  async getTests(
    @Param('limit') limit: number = 10,
  ): Promise<TestFunctionRes[]> {
    try {
      return await this.testService.getTests(limit);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
