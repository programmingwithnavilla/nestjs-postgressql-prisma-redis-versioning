import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Inject()
  getHello() {
    return 'Hello ';
  }

  checkHealth(): string {
    return 'OK';
  }
}
