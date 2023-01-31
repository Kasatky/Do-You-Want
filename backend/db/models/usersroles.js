const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersRoles extends Model {
    static associate(models) {
      UsersRoles.User = UsersRoles.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });

      UsersRoles.Role = UsersRoles.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'cascade',
      });
    }
  }
  UsersRoles.init(
    {
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UsersRoles',
      tableName: 'UsersRoles',
    },
  );
  return UsersRoles;
};
