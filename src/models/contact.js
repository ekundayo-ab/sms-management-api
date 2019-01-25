export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true }
  }, {});

  return Contact;
};
