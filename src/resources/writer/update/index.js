const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');

const book = Joi.object().keys({
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

const schema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number().integer().min(0),
  books: Joi.array().items(book),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: ctx.params.id }, (doc) => ({
    ...doc,
    ...data,
  }));
}

module.exports.register = (router) => {
  router.put('/:id', validate(schema), handler);
};
