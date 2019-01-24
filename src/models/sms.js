export default (sequelize, DataTypes) => {
  const SMS = sequelize.define('SMS', {
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});

  SMS.associate = (models) => {
    SMS.belongsTo(models.Contact, {
      as: 'sender',
      foreignKey: 'senderId'
    });

    SMS.belongsTo(models.Contact, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
  };
  return SMS;
};
