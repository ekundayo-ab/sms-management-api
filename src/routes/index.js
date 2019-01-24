import { getContacts, addContact, checkContactExistence } from '../controllers/contact';
import { validateContact } from '../util/validation';

const routes = [
  {
    path: '/contacts',
    method: 'GET',
    options: {
      handler: getContacts,
    }
  },
  {
    path: '/contacts',
    method: 'POST',
    options: {
      handler: addContact,
      pre: [{ method: checkContactExistence, assign: 'contact' }],
      validate: {
        payload: validateContact
      }
    },
  },
];

export default routes;
