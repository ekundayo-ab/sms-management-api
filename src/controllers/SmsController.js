import Boom from 'boom';
import models from '../models';

const { SentSms, ReceivedSms, Contact } = models;

export default class SmsController {
  static async sendSms(req, h) {
    const { firstContact, secondContact } = req.pre.contact;
    if (!firstContact || !secondContact) {
      return Boom.notFound('Both sender and receiver phone must have been registered');
    }

    const { message, sender, receiver } = req.payload;
    if (sender.trim() === receiver.trim()) {
      return Boom.badRequest('Message sender cannot be the same as receiver');
    }

    try {
      const sentSms = await SentSms.create({
        message,
        senderId: firstContact.id,
      });

      const receivedSms = await ReceivedSms.create({
        message,
        receiverId: secondContact.id,
        sentSmsId: sentSms.id
      });

      sentSms.dataValues.sender = firstContact;
      receivedSms.dataValues.receiver = secondContact;

      return h.response({ sentSms, receivedSms }).code(201);
    } catch (error) {
      if (error.name === 'ValidationError') throw Boom.badRequest(error);
      throw Boom.internal(error);
    }
  }

  static async readSms(req) {
    const { params, query } = req;

    try {
      const receiver = await Contact.findOne({ where: { id: query.receiverId } });
      if (!receiver) {
        return Boom.notFound('Contact has not been registered');
      }

      const where = { id: params.smsId, receiverId: query.receiverId };
      const sms = await ReceivedSms.findOne({ where });
      if (!sms) {
        return Boom.notFound('No such message exists for this contact');
      }

      if (sms.status === 'read') {
        return sms;
      }
      const receivedSms = await ReceivedSms.update({ status: 'read' }, {
        where,
        returning: true,
        plain: true
      });

      await SentSms.update({ status: 'delivered' }, {
        where: { id: receivedSms[1].sentSmsId }
      });

      return receivedSms[1];
    } catch (error) {
      throw Boom.internal(error);
    }
  }
}
