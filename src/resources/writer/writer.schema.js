const Joi = require('@hapi/joi');

const bookSchema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

const schema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number().integer().min(0),
  createdOn: Joi.date(),
  books: Joi.array().items(bookSchema),
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
