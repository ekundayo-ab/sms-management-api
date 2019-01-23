import Contact from '../models';

const getContacts = () => {
  return Contact.findAll()
    .then(contacts => contacts);
};

export {
  getContacts
};
