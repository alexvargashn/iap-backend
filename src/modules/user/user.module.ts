import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Repository } from 'core/database/repository';
import { DatabaseModule } from 'core/database/database.module';

@Module({
  imports: [],
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
