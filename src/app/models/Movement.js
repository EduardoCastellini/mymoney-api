import Sequelize, { Model } from 'sequelize';

class Movement extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DECIMAL,
        type: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Movement;
