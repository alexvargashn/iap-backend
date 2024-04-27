// import { Repository, Sequelize } from 'sequelize-typescript';
// import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
// import { databaseConfig } from './database.config';
// import { User } from 'src/modules/user/entities/user.entity';
// import { Post } from 'src/modules/post/entities/post.entity';

// interface RepositoryProvider {
//     provide: string;
//     useFactory: () => {};
// }

// const databaseProviders = [
//     {
//         provide: SEQUELIZE,
//         useFactory: async () => {
//             let config;
//             switch (process.env.NODE_ENV) {
//                 case DEVELOPMENT:
//                     config = databaseConfig.development;
//                     break;
//                 case TEST:
//                     config = databaseConfig.test;
//                     break;
//                 case PRODUCTION:
//                     config = databaseConfig.production;
//                     break;
//                 default:
//                     config = databaseConfig.development;
//             }
//             const sequelize = new Sequelize({ repositoryMode: true, ...config });
//             sequelize.addModels([User, Post]);
//             await sequelize.sync();

//             const repositories: RepositoryProvider[] = [];

//             Object.keys(sequelize.models).forEach(modelName => {
//                 const repositoryName = modelName.toUpperCase() + '_REPOSITORY';
//                 repositories.push({
//                     provide: repositoryName,
//                     useFactory: () => {
//                         const model = sequelize.model(modelName);
//                         return sequelize.getRepository(model);
//                     },
//                 });
//             });

//             console.log('REPOSITORIES: ', repositories); // Ahora se imprimirá el array lleno

//             return sequelize;
//         },
//     },
// ];

// export const repositoryProvider = databaseProviders[0].useFactory().then(sequelize => {
//     const repositories: RepositoryProvider[] = [];

//     Object.keys(sequelize.models).forEach(modelName => {
//         const repositoryName = modelName.toUpperCase() + '_REPOSITORY';
//         repositories.push({
//             provide: repositoryName,
//             useFactory: () => {
//                 const model = sequelize.model(modelName);
//                 return sequelize.getRepository(model);
//             },
//         });
//     });

//     return repositories;
// });

// export default databaseProviders;
