import { getContacts, addContact, checkContactExistence, deleteContact } from '../controllers/contact';
import { addSms, getSms, getAllSms } from '../controllers/sms';
import { validateContact, validateSMS } from '../util/validation';

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
  {
    path: '/contacts/{id}',
    method: 'DELETE',
    options: {
      handler: deleteContact,
      pre: [{ method: checkContactExistence, assign: 'contact' }]
    },
  },
  {
    path: '/sms/send',
    method: 'POST',
    options: {
      handler: addSms,
      pre: [{ method: checkContactExistence, assign: 'contact' }],
      validate: {
        payload: validateSMS
      }
    },
  },
  {
    path: '/sms/{smsId}/read',
    method: 'GET',
    options: {
      handler: getSms,
    },
  },
  {
    path: '/sms',
    method: 'GET',
    options: {
      handler: getAllSms
    },
  },
];

export default routes;
