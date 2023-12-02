import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        name: userName,
      },
    });

    return user;
  }

  async createOne({ name, password }: Partial<User>): Promise<User> {
    const id = v4();
    const newUser = { id: name || id, name, password };
    const addedUser = this.userRepository.create(newUser);

    return addedUser;
  }
}
