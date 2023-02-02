const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.Wishes = User.hasMany(models.Wish, {
        foreignKey: 'userId',
        as: 'wishes',
      });

      User.UsersWish = User.hasMany(models.UsersWish, {
        foreignKey: 'userId',
        as: 'acceptedWishes',
      });

      User.Roles = User.hasMany(models.UsersRoles, {
        foreignKey: 'userId',
        as: 'roles',
      });
      User.DiaryEmotion = User.hasMany(models.DiaryEmotion, {
        foreignKey: 'userId',
        as: 'userDiaryNotes',

      });
    }
  }
  User.init(
    {
      email: DataTypes.TEXT,
      userName: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
