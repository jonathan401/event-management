import { FindOneOptions, Repository } from 'typeorm';

import { handleGetRepository } from '../database/handleGetRepository';
import { User } from '../entities/User';

export class UserRepository {
  private _repository: Repository<User>;

  constructor() {
    this._repository = handleGetRepository(User);
  }

  async create(data: Partial<User>) {
    const user = this._repository.create(data);
    return await this._repository.save(user);
  }

  async findOne(options: FindOneOptions<User>) {
    return await this._repository.findOne(options);
  }
}
