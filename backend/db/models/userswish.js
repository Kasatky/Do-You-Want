const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersWish extends Model {
    static associate(models) {
      UsersWish.User = UsersWish.belongsTo(models.User, { foreignKey: 'userId' });
      UsersWish.Wish = UsersWish.belongsTo(models.Wish, { foreignKey: 'wishId' });
    }
  }
  UsersWish.init({
    wishId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    doneCount: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UsersWish',
    tableName: 'UsersWishes',
  });
  return UsersWish;
};
