const Joi = require('@hapi/joi');

const bookSchema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

module.exports = bookSchema;
