const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.Users = Role.hasMany(models.UsersRoles, {
        foreignKey: 'roleId',
        as: 'users',
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
