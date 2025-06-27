import { QueryParams } from './base.interface';
import { IIdentifier } from './identifier.interface';

export interface IUnitOfWork<T> {
  findAll(): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T | null>;
  findOneById(id: number): Promise<T | null>;
  findOneByIdentifier(identifier: IIdentifier): Promise<T | null>;
  paginate(option: QueryParams): Promise<T[]>;
  insert(entity: Partial<T>): Promise<T>;
  update(identifier: IIdentifier, entity: Partial<T>): Promise<T>;
  delete(identifier: IIdentifier): Promise<void>;

  softDelete(identifier: IIdentifier): Promise<T>;
  restore(identifier: IIdentifier): Promise<T>;
}
