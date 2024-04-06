import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Repository } from 'src/core/database/repository';

@Module({
  controllers: [PostController],
  imports: [
    PostModule
  ],
  providers: [
    PostService,
    {
      provide: 'POST_REPOSITORY',
      useFactory: (repository: Repository) => {
        return repository.getRepository('Post');
      },
      inject: [Repository]
    },
    {
      provide: 'USER_REPOSITORY',
      useFactory: (repository: Repository) => {
        return repository.getRepository('User');
      },
      inject: [Repository]
    }
  ],
})
export class PostModule { }
