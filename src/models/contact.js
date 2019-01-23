

export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone: { type: DataTypes.string, unique: true }
  }, {});

  return Contact;
};
