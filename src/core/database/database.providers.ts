
import { SEQUELIZE } from '../constants';
import { getSequelizeInstance } from './database.instance';

const {sequelize, repositoryProvider } =  getSequelizeInstance();


const databaseProvider = [{
   provide: SEQUELIZE,
   useFactory: async () => {
      return sequelize;
   },
}];

export { databaseProvider, repositoryProvider };


