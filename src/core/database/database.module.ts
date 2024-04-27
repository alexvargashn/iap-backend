import { Module } from '@nestjs/common';
import { Repository } from './repository';
import { databaseProviders, repositoryProvider } from './database.providers';
@Module({
    providers: [
        Repository, 
        ...databaseProviders,
        ...repositoryProvider
    ],
    exports: [
        Repository, 
        ...databaseProviders,
        ...repositoryProvider
    ],
})
export class DatabaseModule {}