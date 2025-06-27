import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { IIdentifier } from 'src/common/interfaces/identifier.interface';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async findPaginated(
    page: number,
    size: number,
    sort?: string,
    filters?: Record<string, any>,
  ) {
    return this.userRepository.paginate({ page, size, sort, filters });
  }
  async create(data: CreateUserDTO) {
    return this.userRepository.insert(data);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    return this.userRepository.findOneById(id);
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    const identifier: IIdentifier = { id };
    return this.userRepository.update(identifier, data);
  }

  async delete(id: number) {
    const identifier: IIdentifier = { id };
    return this.userRepository.delete(identifier);
  }

  async softDelete(id: number) {
    const identifier: IIdentifier = { id };
    return this.userRepository.softDelete(identifier);
  }

  async restore(id: number) {
    const identifier: IIdentifier = { id };
    return this.userRepository.restore(identifier);
  }
}
