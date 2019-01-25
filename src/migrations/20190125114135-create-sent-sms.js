module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SentSms', {
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
        values: ['sent', 'delivered'],
        defaultValue: 'sent'
      },
      senderId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'sender',
        },
        allowNull: false
      },
      // receivedSmsId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'ReceivedSms',
      //     key: 'id',
      //     as: 'receivedSms',
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
    return queryInterface.dropTable('SentSms');
  }
};
