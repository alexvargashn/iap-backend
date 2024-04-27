import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class Repository {

    constructor(
        @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) { }

    getRepository(modelName: string) {
        const model = this.sequelize.model(modelName);
        return this.sequelize.getRepository(model)
    }

    provideRepositories() {
        let repositories = [];
        
        Object.keys(this.sequelize.models).forEach(modelName => {
            repositories.push({
                provide: modelName.toUpperCase() + '_REPOSITORY',
                useFactory: () => {
                    return this.getRepository(modelName)
                }
            })
        });
        return repositories
    }

}

