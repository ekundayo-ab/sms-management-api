import Boom from 'boom';
import models from '../models';

const { SentSms, ReceivedSms, Contact } = models;

const sendSms = async (req, h) => {
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
      contactId: firstContact.id,
    });

    const receivedSms = await ReceivedSms.create({
      message,
      contactId: secondContact.id
    });

    return h.response({ sentSms, receivedSms }).code(201);
  } catch (error) {
    if (error.name === 'ValidationError') throw Boom.badRequest(error);
    throw Boom.internal(error);
  }
};

const readSms = async (req) => {
  const { params, query } = req;

  try {
    const receiver = await Contact.findOne({ where: { id: query.receiverId } });
    if (!receiver) {
      return Boom.notFound('Contact has not been registered');
    }

    // const where = { id: params.smsId, receiverId: query.receiverId };
    // let sms = await SMs.findOne({ where });

    // if (!sms) {
    //   return Boom.notFound('No such message exists for this contact');
    // }

    // sms = await SMs.update({ status: true }, {
    //   where,
    //   returning: true,
    //   plain: true
    // });

    // return sms[1];
    return [];
  } catch (error) {
    throw Boom.internal(error);
  }
};

const getAllSms = async () => {
  try {
    const allSms = SMs.findAll({
      include: [
        { model: Contact, as: 'sender', required: true },
        { model: Contact, as: 'receiver', required: true },
      ]
    });

    return allSms;
  } catch (error) {
    throw Boom.internal(error);
  }
};

export {
  sendSms,
  readSms,
  getAllSms
};
