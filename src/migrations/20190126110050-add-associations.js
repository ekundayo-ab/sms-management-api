module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'SentSms',
      'receivedSmsId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ReceivedSms',
          key: 'id',
          as: 'receivedSms',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'ReceivedSms',
        'sentSmsId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'SentSms',
            key: 'id',
            as: 'sentSms'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'SentSms',
      'receivedSmsId'
    ).then(() => {
      return queryInterface.removeColumn(
        'ReceivedSms',
        'sentSmsId'
      );
    });
  }
};
