import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
