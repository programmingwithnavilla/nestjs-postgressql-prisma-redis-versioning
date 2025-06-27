import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { IUnitOfWork } from 'src/common/interfaces/unit-of-work.interface';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IIdentifier } from 'src/common/interfaces/identifier.interface';
import {
  FilterInput,
  Primitive,
  QueryParams,
} from 'src/common/interfaces/base.interface';
import { buildWhereFilter } from 'src/utils/prisma.utils';

@Injectable()
export class PrismaUnitOfWork<
  T extends BaseEntity,
  M extends {
    findMany: (args?: any) => Promise<T[]>;
    findFirst: (args?: any) => Promise<T | null>;
    findUnique: (args: any) => Promise<T | null>;
    create: (args: any) => Promise<T>;
    update: (args: any) => Promise<T>;
    delete: (args: any) => Promise<T>;
  },
> implements IUnitOfWork<T>
{
  constructor(
    private readonly model: M, // Prisma model (e.g., prisma.user)
    private readonly redis: RedisService,
    private readonly modelName: string, // For Redis versioning
  ) {}

  private getVersionKey(id: number): string {
    return `${this.modelName}:${id}:version`;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany({ where: { archivedAt: null } });
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return await this.model.findFirst({
      where: { ...filter, archivedAt: null },
    });
  }

  async findOneById(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findOneByIdentifier(identifier: IIdentifier): Promise<T | null> {
    return await this.model.findFirst({
      where: {
        ...(identifier.id ? { id: identifier.id } : {}),
        archivedAt: null,
      },
    });
  }

  async paginate({
    page = 0,
    size = 10,
    filters,
    sort,
  }: QueryParams): Promise<T[]> {
    const where = buildWhereFilter(
      filters as FilterInput<Record<string, Primitive>>,
    );
    where.archivedAt = null;

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    if (sort) {
      const [field, dir] = sort.split(':');
      if (field) {
        orderBy[field] = dir === 'desc' ? 'desc' : 'asc';
      }
    }

    return this.model.findMany({
      where,
      skip: page * size,
      take: size,
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    });
  }

  async insert(entity: Partial<T>): Promise<T> {
    const created = await this.model.create({ data: entity });
    await this.redis.setVersion(this.getVersionKey(created.id), 1);
    return created;
  }

  async update(identifier: IIdentifier, entity: Partial<T>): Promise<T> {
    const where = { id: identifier.id };
    const updated = await this.model.update({ where, data: entity });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }

  async delete(identifier: IIdentifier): Promise<void> {
    const where = { id: identifier.id };

    await this.model.delete({ where });
    await this.redis.incrementVersion(this.getVersionKey(where.id ?? 0));
  }

  async softDelete(identifier: IIdentifier): Promise<T> {
    const where = { id: identifier.id };

    const updated = await this.model.update({
      where,
      data: { archivedAt: new Date() },
    });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }

  async restore(identifier: IIdentifier): Promise<T> {
    const where = { id: identifier.id };

    const updated = await this.model.update({
      where,
      data: { archivedAt: null },
    });
    await this.redis.incrementVersion(this.getVersionKey(updated.id));
    return updated;
  }
}
