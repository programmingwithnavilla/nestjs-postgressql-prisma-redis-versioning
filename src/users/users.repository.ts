import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from 'src/common/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<any> {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.user);
  }
}
