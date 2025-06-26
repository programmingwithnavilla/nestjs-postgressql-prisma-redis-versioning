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
    await this.incrementVersion(user.id);
    return user;
  }

  async update(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: data,
    });
    await this.incrementVersion(id);
    return user;
  }

  async delete(id: number) {
    await this.prisma.user.delete({ id: id });
    await this.incrementVersion(id);
  }

  private async incrementVersion(id: number) {
    console.log('id', id);
  }
  private async setVersion(userId: number, version: number) {
    console.log(userId, version);
    // await this.
  }

  private resetVersion(userId: number) {
    console.log('userId', userId);
  }
}
