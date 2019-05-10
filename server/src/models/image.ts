'use strict';
const shortid = require('shortid');

module.exports = (sequelize, DataType) => {
  return sequelize.define(
    'Image',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      shortId: {
        type: DataType.STRING,
        defaultValue: shortid.generate
      },
      originalName: {
        type: DataType.STRING
      },
      fileName: {
        type: DataType.STRING
      },
      fileHash: {
        type: DataType.STRING
      },
      fileExt: {
        type: DataType.STRING
      },
      userId: {
        type: DataType.STRING
      },
    },
    {
      indexes: [
        {fields: ['id']},
        {fields: ['fileExt']},
        {fields: ['userId']},
        {fields: ['fileName']},
      ],
      freezeTableName: true
    }
  );
};
