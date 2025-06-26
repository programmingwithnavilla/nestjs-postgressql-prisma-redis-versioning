import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [UsersService, PrismaService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
