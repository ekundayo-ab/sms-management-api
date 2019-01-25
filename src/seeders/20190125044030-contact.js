const faker = require('faker');

const mockContacts = [];
for (let i = 0; i < 10; i += 1) {
  mockContacts.push({
    phone: faker.phone.phoneNumber('0##########'),
    name: faker.name.findName(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Contacts', mockContacts, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
