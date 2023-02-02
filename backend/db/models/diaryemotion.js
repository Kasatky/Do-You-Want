const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiaryEmotion extends Model {
    static associate(models) {
      DiaryEmotion.User = DiaryEmotion.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
      });
    }
  }
  DiaryEmotion.init({
    userId: DataTypes.INTEGER,
    situation: DataTypes.TEXT,
    emotion: DataTypes.TEXT,
    mind: DataTypes.TEXT,
    action: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'DiaryEmotion',
    tableName: 'DiaryEmotions',
  });
  return DiaryEmotion;
};
