import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client = createClient();

  async onModuleInit() {
    await this.client.connect();
  }
  async getVersion(key: string): Promise<number> {
    const version = await this.client.get(key);
    return version ? Number(version) : 1;
  }

  async incrementVersion(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async setVersion(key: string, version: number = 1) {
    await this.client.set(key, version.toString());
  }

  async resetVersion(key: string) {
    await this.client.set(key, '1');
  }
  getClient() {
    return this.client;
  }
}
