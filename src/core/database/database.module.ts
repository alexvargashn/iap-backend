import { Module } from '@nestjs/common';
<<<<<<< HEAD
=======
import { databaseProvider, repositoryProvider } from './database.providers';
>>>>>>> refs/remotes/origin/user
import { Repository } from './repository';
import { databaseProviders, repositoryProvider } from './database.providers';
@Module({
<<<<<<< HEAD
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
=======
    providers: [Repository, ...databaseProvider, ...repositoryProvider],
    exports: [Repository, ...databaseProvider, ...repositoryProvider],
>>>>>>> refs/remotes/origin/user
})
export class DatabaseModule {}