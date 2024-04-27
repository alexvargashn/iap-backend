import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { Repository } from 'src/core/database/repository';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CommonModule } from './modules/common/common.module';

@Global()
@Module({ 
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    CommonModule
  ],
  exports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
