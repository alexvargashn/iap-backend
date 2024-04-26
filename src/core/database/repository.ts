import { Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE } from "src/core/constants";

@Injectable()
export class Repository {

    constructor(
        @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) { }

    getRepository(modelName: string) {
        const model = this.sequelize.model(modelName);
        return this.sequelize.getRepository(model);
    }

}

