export default (sequelize, DataTypes) => {
  const SentSMS = sequelize.define('SentSMS', {
    message: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['sent', 'delivered'],
      defaultValue: 'sent'
    },
    contactId: DataTypes.INTEGER
  }, {});

  SentSMS.associate = (models) => {
    SentSMS.belongsTo(models.Contact, {
      onDelete: 'CASCADE',
      as: 'sender',
      foreignKey: 'senderId'
    });
  };
  return SentSMS;
};
