import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { UserDto } from './dto/user.dto';
import { error } from 'console';
import { SEQUELIZE } from 'src/core/constants';

@Injectable()
export class UserService {

  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,

    @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>
  ) { }

  /**
   * @description Create a user at database and returns it.
   * @param {CreateUserDto} createUserDto 
   * @returns {UserDto} user
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    let user: UserDto = null;
    await this.userRepository.create(createUserDto)
      .then(result => {
        const { password, ...userValues } = result.dataValues;
        user = userValues;
      })
      .catch(error => this.handleDBErrors(error));
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    let userDto: UserDto = null;
    await this.userRepository.findOne<User>({ where: { email }})
      .then(result => {
        userDto = result.dataValues
      })
      .catch(error => {
        this.handleDBErrors(error)
    });
    return userDto;
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

  private handleDBErrors(_error: any) {
    throw new InternalServerErrorException
  }
}
