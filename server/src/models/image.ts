'use strict';

module.exports = (sequelize, DataType) => {
  return sequelize.define(
    'Image',
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        primaryKey: true
      },
      path: {
        type: DataType.STRING
      },
      filename: {
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
