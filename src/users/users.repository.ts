import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from 'src/common/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<any> {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.user);
  }

  async create(data: any) {
    const user = await this.prisma.user.create({ data: data });
    return user;
  }

  private async setVersion(userId: number, version: number) {
    console.log(userId, version);
    // await this.
  }
  private async incrementVersion(userId: number) {
    console.log('userId', userId);
  }
  private resetVersion(userId: number) {
    console.log('userId', userId);
  }
}
