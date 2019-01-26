import Joi from 'joi';

const phoneValidation = Joi.string().regex(/^[0][0-9]\d{9}$|^[1-9]\d{9}$/, 'phone number')
  .required();

const validateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  phone: phoneValidation
});

const validateSMS = Joi.object({
  message: Joi.string().min(2).max(300).required(),
  sender: phoneValidation,
  receiver: phoneValidation,
});

export {
  validateContact,
  validateSMS
};
