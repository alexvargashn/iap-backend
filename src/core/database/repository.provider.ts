import sequelize from "sequelize";
import { databaseProviders } from "./database.providers";
import { error } from "console";
import { Sequelize } from "sequelize-typescript";

export interface RepositoryProvider {
    provide: string;
    useFactory: () => {}

};

export const loadRepositories = (sequelize): RepositoryProvider[] => {
    let providers: RepositoryProvider[] = []; console.log(sequelize);

    Object.keys(sequelize.models).forEach(modelName => {
        const repositoryName = modelName.toUpperCase() + '_REPOSITORY';
        providers.push({
            provide: repositoryName,
            useFactory: () => {
                const model = sequelize.model(modelName);
                return sequelize.getRepository(model)
            }
        });
    });

    return providers;
}