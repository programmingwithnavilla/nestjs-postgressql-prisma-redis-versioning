import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RedisModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
