const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');

const bookSchema = Joi.object().keys({
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

const schema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number().integer().min(0),
  books: Joi.array().items(bookSchema),
});

async function handler(ctx) {
  const { firstName, lastName, age } = ctx.request.body;
  ctx.body = await writerService.create({ firstName, lastName, age });
}

module.exports.register = (router) => {
  router.post('/', validate(schema), handler);
};
