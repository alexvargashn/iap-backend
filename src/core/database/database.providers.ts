import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { getconfigMode } from './utils/getConfigMode';
import { getSequelizeInstance } from './utils/getSequelizeInstance';
import { RepositoryProvider, loadRepositories } from './repository.provider';


let config = getconfigMode();

let sequelize =   getSequelizeInstance(config).then(sequelize => sequelize);


export const repositoryProvider: RepositoryProvider[] = loadRepositories(sequelize);


export const databaseProviders = [{
   provide: SEQUELIZE,
   useFactory: async () => {

      return sequelize;
   },
}];

