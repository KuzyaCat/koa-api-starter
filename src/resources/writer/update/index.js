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
  const { firstName, lastName, age, books }  = ctx.validatedData;
  ctx.body = await writerService._collection.update(
    { _id: ctx.params.id },
    { $set: { firstName, lastName, age, books },
  });
}

module.exports.register = (router) => {
  router.put('/:id', validate(schema), handler);
};
