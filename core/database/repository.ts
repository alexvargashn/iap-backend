import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "core/constants";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class Repository {

    constructor (
        @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {}

   getRepository(modelName: string) {
     const model = this.sequelize.model(modelName);
    return this.sequelize.getRepository(model) 
   }

}

    