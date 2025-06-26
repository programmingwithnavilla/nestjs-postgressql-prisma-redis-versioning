import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(data: CreateUserDTO) {
    return this.userRepository.create({
      data: data,
    });
  }

  async findAll() {
    return this.userRepository.findMany();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, data: CreateUserDTO) {
    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }
}
