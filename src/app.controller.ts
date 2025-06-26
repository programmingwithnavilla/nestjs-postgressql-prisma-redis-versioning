import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller({
  version: VERSION_NEUTRAL,
})
@ApiTags('health')
export class AppController {
  constructor(private readonly service: AppService) {}
  @Get('health-check')
  @Version('1')
  checkHealth(): string {
    return 'OK';
  }

  @Get()
  test() {
    return this.service.getHello();
  }
}
