export default (sequelize, DataTypes) => {
  const ReceivedSMS = sequelize.define('ReceivedSMS', {
    message: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['received', 'read'],
      defaultValue: 'received'
    },
    contactId: DataTypes.INTEGER
  }, {});

  ReceivedSMS.associate = (models) => {
    ReceivedSMS.belongsTo(models.Contact, {
      onDelete: 'CASCADE',
      as: 'sender',
      foreignKey: 'senderId'
    });
  };
  return ReceivedSMS;
};
