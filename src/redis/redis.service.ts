import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis(); // default localhost:6379
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async setVersion(key: string, version: number): Promise<void> {
    await this.client.set(key, version);
  }

  async incrementVersion(key: string): Promise<void> {
    await this.client.incr(key);
  }

  async getVersion(key: string): Promise<number> {
    const val = await this.client.get(key);
    return val ? parseInt(val) : 0;
  }

  async deleteKey(key: string): Promise<void> {
    await this.client.del(key);
  }
}
