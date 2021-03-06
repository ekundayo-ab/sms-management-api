import Boom from 'boom';
import models from '../models';

const { Contact, ReceivedSms, SentSms } = models;

const includeSmsQuery = [
  { model: ReceivedSms, as: 'receivedSms', required: false },
  { model: SentSms, as: 'sentSms', required: false },
];

export default class ContactController {
  static async getAllContacts() {
    const contacts = await Contact.findAll({
      include: includeSmsQuery,
      order: [['id', 'ASC']],
    });
    return contacts;
  }

  static async getContact(req) {
    const contact = await Contact.findOne({
      where: { id: req.params.id },
      include: includeSmsQuery
    });

    if (!contact) {
      return Boom.notFound('Contact does not exist');
    }

    return contact;
  }

  static async addContact(req, h) {
    if (req.pre.contact.firstContact) {
      return Boom.conflict('Contact already exists');
    }

    const { name, phone } = req.payload;
    try {
      const contact = await Contact.create({ name, phone });
      return h.response(contact).code(201);
    } catch (error) {
      if (error.name === 'ValidationError') throw Boom.badRequest(error);
      throw Boom.internal(error);
    }
  }

  static async deleteContact(req) {
    if (!req.pre.contact.firstContact) {
      return Boom.notFound('Contact not found');
    }

    const { id } = req.params;

    try {
      await Contact.destroy({ where: { id } });
      return 'Contact successfully deleted';
    } catch (error) {
      if (error.name === 'ValidationError') throw Boom.badRequest(error);
      throw Boom.internal(error);
    }
  }

  static async checkContactExistence(req) {
    try {
      let firstContact;
      let secondContact;

      if (req.params.id) {
        firstContact = await Contact
          .findOne({ where: { id: req.params.id } });
        secondContact = null;
      } else {
        const { phone, sender, receiver } = req.payload;
        firstContact = await Contact
          .findOne({ where: { phone: phone || sender } });

        secondContact = await Contact
          .findOne({ where: { phone: receiver } });
      }


      return { firstContact, secondContact };
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }
}
