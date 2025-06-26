import { IBaseEntity } from '../entities/base.entity';
import { IIdentifier } from './identifier.interface';

export interface IRepository<T extends IBaseEntity> {
  findAll(): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T | null>;
  findOneById(id: number): Promise<T | null>;
  findOneByIdentifier(identifier: IIdentifier): Promise<T | null>;

  create(entity: Partial<T>): Promise<T>;
  update(identifier: IIdentifier, entity: Partial<T>): Promise<T>;
  delete(identifier: IIdentifier): Promise<void>;

  softDelete(identifier: IIdentifier): Promise<T>;
  restore(identifier: IIdentifier): Promise<T>;
}
