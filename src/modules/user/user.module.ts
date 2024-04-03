import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Repository } from 'src/core/database/repository';

@Module({
  imports: [],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (repository: Repository) => {
        return repository.getRepository('User');
      },
      inject: [Repository]
    } 
  ],
})
export class UserModule {}
