import { ContactController, SmsController } from '../controllers';
import { validateContact, validateSMS } from '../util/validation';

const {
  getAllContacts,
  addContact,
  deleteContact,
  getContact,
  checkContactExistence
} = ContactController;

const { sendSms, readSms } = SmsController;

const routes = [
  {
    path: '/contacts',
    method: 'GET',
    options: {
      handler: getAllContacts,
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
    method: 'GET',
    options: {
      handler: getContact
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
      handler: sendSms,
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
      handler: readSms,
    },
  }
];

export default routes;
