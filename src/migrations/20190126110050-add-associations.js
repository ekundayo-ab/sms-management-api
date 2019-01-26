module.exports = {
  up: (queryInterface, Sequelize) => {
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
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    // .then(() => {
    //   return queryInterface.addColumn(
    //     'SentSms',
    //     'receivedSmsId',
    //     {
    //       type: Sequelize.INTEGER,
    //       references: {
    //         model: 'ReceivedSms',
    //         key: 'id',
    //         as: 'receivedSms',
    //       },
    //       allowNull: false,
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     }
    //   );
    // });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'ReceivedSms',
      'sentSmsId'
    );
    // .then(() => {
    //   return queryInterface.removeColumn(
    //     'SentSms',
    //     'receivedSmsId'
    //   );
    // });
  }
};
