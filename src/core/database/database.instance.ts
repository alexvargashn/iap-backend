import { Sequelize } from "sequelize-typescript";
import { Post } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";
import { DEVELOPMENT, PRODUCTION, TEST } from "../constants";
import { databaseConfig } from "./database.config";

export const getSequelizeInstance = () => {

    let repositoryProvider = [];

    const config = {
        [DEVELOPMENT]: databaseConfig.development,
        [TEST]: databaseConfig.test,
        [PRODUCTION]: databaseConfig.production,
     };

    const sequelize = new Sequelize({
        repositoryMode: true,
        ...config[process.env.NODE_ENV || DEVELOPMENT]
    });
    
    sequelize.addModels([
        User,
        Post
    ]);
    
    sequelize.sync()
        .then()
        .catch(error => {
            console.log('Error: ', error);
            throw new Error('Database connection failed');
    });

    Object.keys(sequelize.models).forEach(modelName => {
        const model = sequelize.model(modelName);
        repositoryProvider.push({
            provide: modelName.toUpperCase() + '_REPOSITORY',
            useFactory: () => {
                return sequelize.getRepository(model)
            }
        });
    });
    return { sequelize, repositoryProvider };
}