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
      description: 'Get all contacts',
      notes: 'Returns all contacts in the database with the sent and received SMS of each one'
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
      },
      description: 'Add a new contact to the database',
      notes: 'Returns the newly created contact'
    }
  },
  {
    path: '/contacts/{id}',
    method: 'GET',
    options: {
      handler: getContact,
      description: 'Get a single contact from the database',
      notes: 'Returns the contact matching the id parameter provided'
    }
  },
  {
    path: '/contacts/{id}',
    method: 'DELETE',
    options: {
      handler: deleteContact,
      pre: [{ method: checkContactExistence, assign: 'contact' }],
      description: 'Deletes a contact from the database',
      notes: 'Returns a deletion successful message'
    }
  },
  {
    path: '/sms/send',
    method: 'POST',
    options: {
      handler: sendSms,
      pre: [{ method: checkContactExistence, assign: 'contact' }],
      validate: {
        payload: validateSMS
      },
      description: 'Send an SMS',
      notes: 'Returns the sent and received SMS with their contact details'
    }
  },
  {
    path: '/sms/{smsId}/read',
    method: 'GET',
    options: {
      handler: readSms,
      description: 'Read an SMS',
      notes: 'Returns the received SMS with its status changed to read'
    }
  }
];

export default routes;
