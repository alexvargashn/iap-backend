import { Sequelize } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";
import { Post } from "src/modules/post/entities/post.entity";

export const getSequelizeInstance = async (config) => {
    const sequelize = new Sequelize({ repositoryMode: true, ...config });
    sequelize.addModels([
       User,
       Post
    ]);
    await sequelize.sync();
    return sequelize;
 }
 