import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUnitOfWork } from 'src/database/prisma.unit-of-work';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserRepository extends PrismaUnitOfWork<
  User,
  PrismaService['user']
> {
  constructor(prisma: PrismaService, redis: RedisService) {
    super(prisma.user, redis, 'user');
  }
}
