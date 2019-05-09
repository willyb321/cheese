'use strict';

module.exports = (sequelize, DataType) => {
  return sequelize.define(
    'Image',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      originalName: {
        type: DataType.STRING
      },
      fileName: {
        type: DataType.STRING
      },
      userId: {
        type: DataType.STRING
      },
      fileExt: {
        type: DataType.STRING
      }
    },
    {
      indexes: [
        {fields: ['expiresAt']},
        {fields: ['id']}
      ],
      freezeTableName: true
    }
  );
};
