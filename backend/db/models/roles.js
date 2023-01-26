const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.User = Role.belongsToMany(models.Role, {
        through: 'UsersRoles', foreignKey: 'roleId', otherKey: 'userId', as: 'users',
      });
    }
  }
  Role.init({
    role: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
  });
  return Role;
};
