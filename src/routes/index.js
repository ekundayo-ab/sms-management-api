import { getContacts } from '../controllers/contact';

const routes = [
  {
    path: '/contacts',
    method: 'GET',
    options: {
      handler: getContacts,
    }
  }
];

export default routes;
