import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @Inject('POST_REPOSITORY') private readonly postRepository: Repository<Post>,
    @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>
  ) { }

  async create(post: CreatePostDto, userId): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll({
      include: [{
        model: this.userRepository,
        attributes: {exclude: ['password']}
      }],
    });
  }

  async findOne(id): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: this.userRepository, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update({ ...data }, { where: { id, userId }, returning: true });

    return { numberOfAffectedRows, updatedPost };
  }
}
