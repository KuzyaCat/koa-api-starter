const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const bookSchema = require('../book.schema');

const schema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number().integer().min(0),
  books: Joi.array().items(bookSchema),
});

async function handler(ctx) {
  const { firstName, lastName, age } = ctx.request.body;
  const books = [];
  ctx.body = await writerService.create({ firstName, lastName, age, books });
}

module.exports.register = (router) => {
  router.post('/', validate(schema), handler);
};
