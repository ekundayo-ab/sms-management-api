import Boom from 'boom';
import models from '../models';

const { Contact } = models;

const getContacts = () => {
  return Contact.findAll().then(contacts => contacts);
};

const addContact = async (req) => {
  if (req.pre.contact) {
    return Boom.conflict('Contact already exists');
  }

  const { name, phone } = req.payload;
  try {
    const expense = await Contact.create({ name, phone });
    return expense;
  } catch (error) {
    if (error.name === 'ValidationError') throw Boom.badRequest(error);
    throw Boom.internal(error);
  }
};

const checkContactExistence = async (req) => {
  try {
    const result = await Contact.findOne({
      where: { phone: req.payload.phone }
    });

    return result;
  } catch (error) {
    throw Boom.badRequest(error);
  }
};

export {
  getContacts,
  addContact,
  checkContactExistence
};
