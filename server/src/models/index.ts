'use strict';

import config from '../config/config';
import * as Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const conf = config[env];

//TODO: finish this
export interface IDB {
  sequelize: any;
  Sequelize: any;
  Image: any;
  User: any;
}

export const models = {} as IDB;
let sequelize;
if (conf.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[conf.use_env_variable], conf);
} else {
  sequelize = new Sequelize.Sequelize(
    conf.database,
    conf.username,
    conf.password,
    conf
  );
}

const UserModel = sequelize.import('./user.js');
models[UserModel.name] = UserModel;

const ImageModel = sequelize.import('./image.js');
models[ImageModel.name] = ImageModel;

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

models.Sequelize = Sequelize;

sequelize.sync();
