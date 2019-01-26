export default (sequelize, DataTypes) => {
  const SentSms = sequelize.define('SentSms', {
    message: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['sent', 'delivered'],
      defaultValue: 'sent'
    }
  }, {});

  SentSms.associate = (models) => {
    SentSms.belongsTo(models.Contact, {
      onDelete: 'CASCADE',
      as: 'sender',
      foreignKey: 'senderId'
    });

    SentSms.hasOne(models.ReceivedSms, {
      as: 'sentSms',
      foreignKey: 'sentSmsId'
    });
  };
  return SentSms;
};
