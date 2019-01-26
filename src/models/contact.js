export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true }
  }, {});

  Contact.associate = (models) => {
    Contact.hasMany(models.ReceivedSms, {
      foreignKey: 'receiverId',
      as: 'receivedSms'
    });

    Contact.hasMany(models.SentSms, {
      foreignKey: 'senderId',
      as: 'sentSms'
    });
  };

  return Contact;
};
