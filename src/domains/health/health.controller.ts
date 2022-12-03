import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('/')
  async checkHealth(): Promise<{ success: true }> {
    return {
      success: true,
    };
  }
}
