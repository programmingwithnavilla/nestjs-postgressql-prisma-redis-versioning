import { Injectable } from '@nestjs/common';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IUnitOfWork } from 'src/common/interfaces/unit-of-work.interface';
import { PrismaService } from './prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { IIdentifier } from 'src/common/interfaces/identifier.interface';

@Injectable()
export class PrismaUnitOfWork<T extends BaseEntity> implements IUnitOfWork<T> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private modelName: keyof PrismaService,
  ) {}
  private getModel() {
    return this.prisma[this.modelName] as any;
  }
  private getVersionKey(id: number) {
    return `${this.modelName}:${id}:version`;
  }

  async findAll(): Promise<T[]> {
    return this.getModel().findMany({ where: { archivedAt: null } });
  }
  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.getModel().findFirst({
      where: { ...filter, archivedAt: null },
    });
  }
  async findOneById(id: number): Promise<T | null> {
    return this.getModel().findUnique({ where: { id } });
  }
  async findOneByIdentifier(identifier: IIdentifier): Promise<T | null> {
    const where = { id: identifier.id };

    return this.getModel().findFirst({ where: { ...where, archivedAt: null } });
  }

  async insert(entity: Partial<T>): Promise<T> {
    const created = await this.getModel().create({ data: entity });
    await this.redis.setVersion(this.getVersionKey(created.id), 1);
    return created;
  }
  async update(identifier: IIdentifier, entity: Partial<T>): Promise<T> {
    const where = { id: identifier.id };

    const updated = await this.getModel().update({ where, data: entity });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }
  async delete(identifier: IIdentifier): Promise<void> {
    const where = { id: identifier.id };

    await this.getModel().delete({ where });
    await this.redis.incrementVersion(
      this.getVersionKey(where.id || where.slug),
    );
  }
  async softDelete(identifier: IIdentifier): Promise<T> {
    const where = { id: identifier.id };
    const updated = await this.getModel().update({
      where,
      data: { archivedAt: new Date() },
    });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }

  async restore(identifier: IIdentifier): Promise<T> {
    const where = { id: identifier.id };
    const updated = await this.getModel().update({
      where,
      data: { archivedAt: null },
    });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }
}
