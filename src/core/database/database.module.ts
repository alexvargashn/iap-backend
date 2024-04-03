import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { Repository } from './repository';

@Module({
    providers: [Repository, ...databaseProviders],
    exports: [Repository, ...databaseProviders],
})
export class DatabaseModule { }