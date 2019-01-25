module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ReceivedSms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['received', 'read'],
        defaultValue: 'received'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'receiver',
        },
        allowNull: false
      },
      // sentSmsId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'SentSms',
      //     key: 'id',
      //     as: 'sentSms',
      //   },
      //   allowNull: false
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('ReceivedSms');
  }
};
