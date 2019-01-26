export default (sequelize, DataTypes) => {
  const ReceivedSms = sequelize.define('ReceivedSms', {
    message: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['received', 'read'],
      defaultValue: 'received'
    }
  }, {});

  ReceivedSms.associate = (models) => {
    ReceivedSms.belongsTo(models.Contact, {
      onDelete: 'CASCADE',
      as: 'receiver',
      foreignKey: 'receiverId'
    });

    ReceivedSms.hasOne(models.SentSms, {
      as: 'receivedSms',
      foreignKey: 'receivedSmsId'
    });
  };
  return ReceivedSms;
};
