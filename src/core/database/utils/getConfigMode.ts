import { DEVELOPMENT, PRODUCTION, TEST } from "src/core/constants";
import { databaseConfig } from "../database.config";

export const getconfigMode = () => {
    let config = null;
 
    switch (process.env.NODE_ENV) {
       case DEVELOPMENT:
          config = databaseConfig.development;
          break;
       case TEST:
          config = databaseConfig.test;
          break;
       case PRODUCTION:
          config = databaseConfig.production;
          break;
       default:
          config = databaseConfig.development;
    }
 
    return config;
 }