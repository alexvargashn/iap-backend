import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
   // @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>
  ) {  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create<User>(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { username } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
