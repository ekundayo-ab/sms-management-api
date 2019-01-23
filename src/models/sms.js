export default (sequelize, DataTypes) => {
  const SMS = sequelize.define('SMS', {
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});

  SMS.associate = (models) => {
    SMS.belongsTo(models.Contact, {
      as: 'senderId',
      foreignKey: 'senderId'
    });

    SMS.belongsTo(models.Contact, {
      as: 'receiverId',
      foreignKey: 'receiverId'
    });
  };
  return SMS;
};
