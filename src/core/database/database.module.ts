import { Module } from '@nestjs/common';
import { databaseProvider, repositoryProvider } from './database.providers';
import { Repository } from './repository';

@Module({
    providers: [Repository, ...databaseProvider, ...repositoryProvider],
    exports: [Repository, ...databaseProvider, ...repositoryProvider],
})
export class DatabaseModule { }