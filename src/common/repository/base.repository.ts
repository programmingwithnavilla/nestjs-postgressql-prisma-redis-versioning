import { IBaseEntity } from '../entities/base.entity';
import { IIdentifier } from '../interfaces/identifier.interface';
import { IRepository } from '../interfaces/repository.interface';
import { IUnitOfWork } from '../interfaces/unit-of-work.interface';

export class BaseRepository<T extends IBaseEntity> implements IRepository<T> {
  constructor(private readonly unitOfWork: IUnitOfWork<T>) {}
  async findAll(): Promise<T[]> {
    return this.unitOfWork.findAll();
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.unitOfWork.findOne(filter);
  }

  async findOneById(id: number): Promise<T | null> {
    return this.unitOfWork.findOneById(id);
  }

  async findOneByIdentifier(identifier: IIdentifier): Promise<T | null> {
    return this.unitOfWork.findOneByIdentifier(identifier);
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.unitOfWork.insert(entity);
  }

  async update(identifier: IIdentifier, entity: Partial<T>): Promise<T> {
    return this.unitOfWork.update(identifier, entity);
  }

  async delete(identifier: IIdentifier): Promise<void> {
    return this.unitOfWork.delete(identifier);
  }

  async softDelete(identifier: IIdentifier): Promise<T> {
    return this.unitOfWork.softDelete(identifier);
  }

  async restore(identifier: IIdentifier): Promise<T> {
    return this.unitOfWork.restore(identifier);
  }
}
