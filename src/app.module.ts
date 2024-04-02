import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { Repository } from 'core/database/repository';

@Global()
@Module({ 
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule
  ],
  exports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, Repository],
})
export class AppModule {}
