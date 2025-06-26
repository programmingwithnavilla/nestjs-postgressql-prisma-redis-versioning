import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

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
