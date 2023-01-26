const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.Wishes = User.hasMany(models.Wish, { foreignKey: 'userId', as: 'wishes' });
      User.UsersWish = User.hasMany(models.UsersWish, { foreignKey: 'userId', as: 'acceptedWishes' });
      User.Role = User.belongsToMany(models.Role, {
        through: 'UsersRoles', foreignKey: 'userId', otherKey: 'roleId', as: 'roles',
      });
    }
  }
  User.init({
    email: DataTypes.TEXT,
    userName: DataTypes.TEXT,
    password: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
