const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wish.User = Wish.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      Wish.UsersWish = Wish.hasMany(models.UsersWish, { foreignKey: 'wishId', as: 'acceptedByUsers' });
    }
  }
  Wish.init({
    wish: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN,
    isModeraited: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Wish',
    tableName: 'Wishes',
  });
  return Wish;
};
